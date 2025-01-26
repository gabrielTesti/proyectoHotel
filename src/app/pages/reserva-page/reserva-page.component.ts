import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from 'src/app/service/reserva.service';

@Component({
  selector: 'app-reserva-page',
  templateUrl: './reserva-page.component.html',
  styleUrls: ['./reserva-page.component.css']
})
export class ReservaPageComponent implements OnInit {
  nombreUsuario: string = '';
  rolUsuario: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  idHabitacion: number = 0;
  idHuesped: number = 0;

  constructor(private router: Router, private reservaService: ReservaService) {}

  ngOnInit(): void {
    const datosUsuario = JSON.parse(localStorage.getItem('datosUsuario') || '{}');
    this.nombreUsuario = datosUsuario.nombre || 'Usuario';
    this.rolUsuario = datosUsuario.rol || 'Desconocido';
  }

  cerrarSesion(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  hacerReserva(): void {
    const datosReserva = {
      fecha_inicio: this.fechaInicio,
      fecha_fin: this.fechaFin,
      id_habitacion: this.idHabitacion,
      id_usuario: 1, // Cambia esto al ID del usuario logueado
      id_reserva_huesped: this.idHuesped
    };

    this.reservaService.crearReserva(datosReserva)
      .subscribe(respuesta => {
        alert('Reserva realizada con éxito');
        this.router.navigate(['/']);
      }, error => {
        console.error('Error al hacer la reserva', error);
      });
  }
}