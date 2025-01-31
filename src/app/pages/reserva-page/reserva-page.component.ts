import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HabitacionService } from 'src/app/service/habitacion.service';
import { ReservaService } from 'src/app/service/reserva.service';
import { Habitacion } from 'src/app/interfaces/habitacion';
import { Reserva } from 'src/app/interfaces/reserva';

@Component({
  selector: 'app-reserva-page',
  templateUrl: './reserva-page.component.html',
  styleUrls: ['./reserva-page.component.css']
})
export class ReservaPageComponent implements OnInit {
  idHabitacion: number = 0;
  fechaInicio: string = '';
  fechaFin: string = '';
  tipo: number = 0;
  habitacion: Habitacion | null = null;
  habitacionesDisponibles: Habitacion[] = [];
  huespedes: { nombre: string, apellido: string, dni: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private habitacionService: HabitacionService,
    private reservaService: ReservaService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idHabitacion = params['idHabitacion'];
      this.fechaInicio = params['fechaEntrada'];
      this.fechaFin = params['fechaSalida'];
      this.tipo = params['tipo'];

      this.habitacionService.obtenerHabitacion(this.idHabitacion).subscribe(response => {
        if (response.codigo === 200) {
          this.habitacion = response.payload[0];
          this.huespedes = Array(this.tipo).fill({}).map(() => ({ nombre: '', apellido: '', dni: '' }));
        } else {
          alert('Error al obtener la habitación');
        }
      }, error => {
        console.error('Error al obtener la habitación', error);
      });
    });
  }

  verificarDisponibilidad() {
    const params = {
      fechaEntrada: this.fechaInicio,
      fechaSalida: this.fechaFin,
      tipo: this.tipo.toString()
    };

    this.habitacionService.obtenerHabitaciones()
      .subscribe(respuesta => {
        if (respuesta && respuesta.payload) {
          this.habitacionesDisponibles = respuesta.payload.filter((habitacion: Habitacion) => {
            return habitacion.tipo === params.tipo && habitacion.estado === 'libre';
          });
        }
      }, error => {
        console.error('Error al verificar disponibilidad', error);
      });
  }

  reservarHabitacion(idHabitacion: number) {
    if (!localStorage.getItem('token')) {
      alert('Por favor, inicie sesión para realizar una reserva.');
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/reserva-page'], { 
      queryParams: { 
        idHabitacion: idHabitacion,
        fechaEntrada: this.fechaInicio,
        fechaSalida: this.fechaFin,
        tipo: this.tipo
      }
    });
  }

  reservar() {
    if (this.habitacion) {
      const reserva: Reserva = {
        id_reserva: 0, // Este campo será autogenerado por la base de datos
        id_habitacion: this.habitacion.id_habitacion,
        id_usuario: 0, // Asume que el ID del usuario se maneja de otra manera
        fecha_inicio: this.fechaInicio,
        fecha_fin: this.fechaFin,
        id_reserva_huesped: 0 // Asume que este campo será manejado por la base de datos
      };

      this.reservaService.crearReserva(reserva).subscribe(response => {
        if (response.codigo === 200) {
          alert('Reserva realizada exitosamente');
          this.router.navigate(['/']);
        } else {
          alert('Error al realizar la reserva');
        }
      }, error => {
        console.error('Error al realizar la reserva', error);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }

  modificarDatos() {
    this.router.navigate(['/modificar-datos-personales']);
  }
}