import { Component } from '@angular/core';
import { HuespedService } from 'src/app/service/huesped.service';
import { HabitacionService } from 'src/app/service/habitacion.service';
import { ReservaService } from 'src/app/service/reserva.service';
import { Huesped } from 'src/app/interfaces/huesped';
import { Habitacion } from 'src/app/interfaces/habitacion';

@Component({
  selector: 'app-checkin-checkout',
  templateUrl: './checkin-checkout.component.html',
  styleUrls: ['./checkin-checkout.component.css']
})
export class CheckinCheckoutComponent {
  dni: string = '';
  habitacionNumero: number = 0;
  huesped: Huesped | null = null;
  habitacion: Habitacion | null = null;

  constructor(
    private huespedService: HuespedService,
    private habitacionService: HabitacionService,
    private reservaService: ReservaService
  ) { }

  buscarHuesped() {
    const dniNumber = Number(this.dni);
    if (isNaN(dniNumber)) {
      alert('Por favor, ingrese un DNI válido');
      return;
    }

    this.huespedService.obtenerHuespedReserva(dniNumber).subscribe(response => {
      if (response.codigo === 200) {
        this.huesped = response.payload[0];
        this.reservaService.obtenerReservaUsuario(this.huesped.id_reserva_huesped).subscribe(reservaResponse => {
          if (reservaResponse.codigo === 200) {
            const reserva = reservaResponse.payload[0];
            this.buscarHabitacionPorNumero(reserva.id_habitacion);
          } else {
            alert('Reserva no encontrada');
          }
        });
      } else {
        alert('Huésped no encontrado');
      }
    }, error => {
      console.error('Error al buscar el huésped', error);
    });
  }

  buscarHabitacion() {
    this.buscarHabitacionPorNumero(this.habitacionNumero);
  }

  buscarHabitacionPorNumero(numero: number) {
    this.habitacionService.obtenerHabitaciones().subscribe(response => {
      if (response.codigo === 200) {
        const habitaciones: Habitacion[] = response.payload;
        this.habitacion = habitaciones.find(h => h.numero === numero) || null;
        if (!this.habitacion) {
          alert('Habitación no encontrada');
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