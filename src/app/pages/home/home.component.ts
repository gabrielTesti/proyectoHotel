import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/service/reserva.service';
import { Habitacion } from 'src/app/interfaces/habitacion';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  fechaEntrada: string = "";
  fechaSalida: string = "";
  cantidadPersonas: number = 0;
  habitacionesDisponibles: Habitacion[] = [];

  constructor(private reservaService: ReservaService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  verificarDisponibilidad() {
    const params = {
      fechaEntrada: this.fechaEntrada,
      fechaSalida: this.fechaSalida,
      cantidadPersonas: this.cantidadPersonas.toString()
    };
    this.reservaService.obtenerReservas()
      .subscribe(respuesta => {
        this.habitacionesDisponibles = respuesta.payload.filter((habitacion: Habitacion) => {
          // Lógica para filtrar habitaciones disponibles según los parámetros
          const habitacionFechaEntrada = new Date(habitacion.fechaEntrada);
          const habitacionFechaSalida = new Date(habitacion.fechaSalida);
          const paramsFechaEntrada = new Date(params.fechaEntrada);
          const paramsFechaSalida = new Date(params.fechaSalida);

          return habitacionFechaEntrada <= paramsFechaEntrada &&
                 habitacionFechaSalida >= paramsFechaSalida &&
                 habitacion.cantidadPersonas >= parseInt(params.cantidadPersonas);
        });
      }, error => {
        console.error('Error al verificar disponibilidad', error);
      });
  }

  hacerReserva(idHabitacion: number) {
    if (!this.isLoggedIn) {
      alert('Por favor, inicie sesión o regístrese para continuar.');
      return;
    }

    const datosReserva = {
      fechaEntrada: this.fechaEntrada,
      fechaSalida: this.fechaSalida,
      cantidadPersonas: this.cantidadPersonas,
      idHabitacion: idHabitacion,
      idUsuario: 1 // Cambia esto al ID del usuario logueado
    };

    this.reservaService.crearReserva(datosReserva)
      .subscribe(respuesta => {
        alert('Reserva realizada con éxito');
      }, error => {
        console.error('Error al hacer la reserva', error);
      });
  }
}