import { Component } from '@angular/core';
import { HabitacionService } from 'src/app/service/habitacion.service';
import { Habitacion } from 'src/app/interfaces/habitacion';

@Component({
  selector: 'app-checkin-checkout',
  templateUrl: './checkin-checkout.component.html',
  styleUrls: ['./checkin-checkout.component.css']
})
export class CheckinCheckoutComponent {
  habitacionNumero: number = 0;
  habitacion: Habitacion | null = null;

  constructor(
    private habitacionService: HabitacionService
  ) { }

  buscarHabitacion() {
    this.buscarHabitacionPorNumero(this.habitacionNumero);
  }

  buscarHabitacionPorNumero(numero: number) {
    this.habitacionService.obtenerHabitaciones().subscribe(response => {
      console.log('Respuesta del servicio obtenerHabitaciones:', response);
      if (response.codigo === 200) {
        const habitaciones: Habitacion[] = response.payload;
        this.habitacion = habitaciones.find(h => h.numero === numero) || null;
        if (!this.habitacion) {
          alert('Habitación no encontrada');
        } else {
          console.log('Habitación encontrada:', this.habitacion);
        }
      } else {
        alert('Error al obtener las habitaciones');
      }
    }, error => {
      console.error('Error al obtener las habitaciones', error);
    });
  }

  realizarCheckin() {
    if (this.habitacion) {
      this.habitacion.estado = 'ocupada';
      this.habitacionService.actualizarHabitacion(this.habitacion.id_habitacion, this.habitacion).subscribe(response => {
        if (response.codigo === 200) {
          alert('Checkin realizado exitosamente');
        } else {
          alert('Error al realizar el checkin');
        }
      }, error => {
        console.error('Error al realizar el checkin', error);
      });
    }
  }

  realizarCheckout() {
    if (this.habitacion) {
      this.habitacion.estado = 'libre';
      this.habitacionService.actualizarHabitacion(this.habitacion.id_habitacion, this.habitacion).subscribe(response => {
        if (response.codigo === 200) {
          alert('Checkout realizado exitosamente');
        } else {
          alert('Error al realizar el checkout');
        }
      }, error => {
        console.error('Error al realizar el checkout', error);
      });
    }
  }
}