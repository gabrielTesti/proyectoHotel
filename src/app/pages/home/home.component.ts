import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/service/reserva.service';
import { HabitacionService } from 'src/app/service/habitacion.service';
import { Habitacion } from 'src/app/interfaces/habitacion';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  fechaEntrada: string = "";
  fechaSalida: string = "";
  tipo: number = 0;
  habitacionesDisponibles: Habitacion[] = [];

  constructor(
    private reservaService: ReservaService,
    private habitacionService: HabitacionService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  verificarDisponibilidad() {
    const params = {
      fechaEntrada: this.fechaEntrada,
      fechaSalida: this.fechaSalida,
      tipo: this.tipo.toString()
    };
    this.habitacionService.obtenerHabitaciones()
      .subscribe(respuesta => {
        console.log('Respuesta de la API:', respuesta); // Añadir log para depuración
        this.habitacionesDisponibles = respuesta.payload.filter((habitacion: Habitacion) => {
          // Lógica para filtrar habitaciones disponibles según los parámetros
          return habitacion.tipo === params.tipo;
        });
        console.log('Habitaciones disponibles:', this.habitacionesDisponibles); // Añadir log para depuración
      }, error => {
        console.error('Error al verificar disponibilidad', error);
      });
  }

  hacerReserva(idHabitacion: number) {
    if (!this.isLoggedIn) {
      alert('Por favor, inicie sesión o regístrese para continuar.');
      this.router.navigate(['/login']);
      return;
    }

    const datosReserva = {
      fecha_inicio: this.fechaEntrada,
      fecha_fin: this.fechaSalida,
      id_habitacion: idHabitacion,
      id_usuario: 1, // Cambia esto al ID del usuario logueado
      id_reserva_huesped: 1 // Cambia esto al ID del huesped correspondiente
    };

    this.reservaService.crearReserva(datosReserva)
      .subscribe(respuesta => {
        alert('Reserva realizada con éxito');
      }, error => {
        console.error('Error al hacer la reserva', error);
      });
  }
}