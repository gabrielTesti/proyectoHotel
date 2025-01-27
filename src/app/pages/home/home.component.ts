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
    if (!this.isLoggedIn) {
      alert('Por favor, inicie sesión para realizar una reserva.');
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/reserva'], { 
      queryParams: { 
        idHabitacion: idHabitacion,
        fechaEntrada: this.fechaEntrada,
        fechaSalida: this.fechaSalida
      }
    });
  }
}