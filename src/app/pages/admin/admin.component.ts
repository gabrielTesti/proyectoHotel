import { Component, OnInit } from '@angular/core';
import { HabitacionService } from 'src/app/service/habitacion.service';
import { Habitacion } from 'src/app/interfaces/habitacion';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  tipoHabitacion: string = '';
  tipoCama: string = '';
  numero: number = 0;
  estado: string = 'libre';
  cantidadCamasSimples: number = 0;
  cantidadCamasDobles: number = 0;
  habitaciones: Habitacion[] = [];
  habitacionesFiltradas: Habitacion[] = [];
  habitacionSeleccionada: Habitacion | null = null;
  filtroNumero: string = '';

  constructor(private habitacionService: HabitacionService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.obtenerHabitaciones();
  }

  obtenerHabitaciones() {
    this.habitacionService.obtenerHabitaciones().subscribe(response => {
      if (response.codigo === 200) {
        this.habitaciones = response.payload;
        this.habitacionesFiltradas = this.habitaciones;
      } else {
        console.error('Error al obtener habitaciones');
      }
    }, error => {
      console.error('Error al obtener habitaciones', error);
    });
  }

  seleccionarHabitacion(habitacion: Habitacion) {
    this.habitacionSeleccionada = habitacion;
    this.numero = habitacion.numero;
    this.tipoHabitacion = habitacion.tipo;
    this.cantidadCamasSimples = habitacion.cantidad_camas_simples;
    this.cantidadCamasDobles = habitacion.cantidad_camas_dobles;
    this.estado = habitacion.estado;
    this.actualizarCamas();
  }

  crearHabitacion() {
    const habitacion: Habitacion = {
      id_habitacion: 0, // Este campo será autogenerado por la base de datos
      numero: this.numero,
      tipo: this.tipoHabitacion,
      cantidad_camas_simples: this.cantidadCamasSimples,
      cantidad_camas_dobles: this.cantidadCamasDobles,
      estado: this.estado
    };

    this.habitacionService.crearHabitacion(habitacion).subscribe(response => {
      if (response.codigo === 200) {
        console.log('Habitación creada exitosamente');
        this.snackBar.open('Habitación creada exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.resetForm();
        this.obtenerHabitaciones();
      } else {
        console.error('Error al crear la habitación');
        this.snackBar.open('Error al crear la habitación', 'Cerrar', {
          duration: 3000,
        });
      }
    }, error => {
      console.error('Error al crear la habitación', error);
      this.snackBar.open('Error al crear la habitación', 'Cerrar', {
        duration: 3000,
      });
    });
  }

  actualizarHabitacion() {
    if (!this.habitacionSeleccionada) {
      this.snackBar.open('Seleccione una habitación para actualizar', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    const habitacion: Habitacion = {
      id_habitacion: this.habitacionSeleccionada.id_habitacion,
      numero: this.numero,
      tipo: this.tipoHabitacion,
      cantidad_camas_simples: this.cantidadCamasSimples,
      cantidad_camas_dobles: this.cantidadCamasDobles,
      estado: this.estado
    };

    this.habitacionService.actualizarHabitacion(habitacion.id_habitacion, habitacion).subscribe(response => {
      if (response.codigo === 200) {
        console.log('Habitación actualizada exitosamente');
        this.snackBar.open('Habitación actualizada exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.resetForm();
        this.obtenerHabitaciones();
      } else {
        console.error('Error al actualizar la habitación');
        this.snackBar.open('Error al actualizar la habitación', 'Cerrar', {
          duration: 3000,
        });
      }
    }, error => {
      console.error('Error al actualizar la habitación', error);
      this.snackBar.open('Error al actualizar la habitación', 'Cerrar', {
        duration: 3000,
      });
    });
  }

  resetForm() {
    this.tipoHabitacion = '';
    this.tipoCama = '';
    this.numero = 0;
    this.estado = 'libre';
    this.cantidadCamasSimples = 0;
    this.cantidadCamasDobles = 0;
    this.habitacionSeleccionada = null;
  }

  actualizarCamas() {
    if (this.tipoHabitacion === '2 personas') {
      if (this.tipoCama === '2 camas simples') {
        this.cantidadCamasSimples = 2;
        this.cantidadCamasDobles = 0;
      } else if (this.tipoCama === '1 cama doble') {
        this.cantidadCamasSimples = 0;
        this.cantidadCamasDobles = 1;
      }
    } else if (this.tipoHabitacion === '3 personas') {
      if (this.tipoCama === '3 camas simples') {
        this.cantidadCamasSimples = 3;
        this.cantidadCamasDobles = 0;
      } else if (this.tipoCama === '1 cama doble y 1 cama simple') {
        this.cantidadCamasSimples = 1;
        this.cantidadCamasDobles = 1;
      }
    }
  }

  filtrarHabitaciones() {
    this.habitacionesFiltradas = this.habitaciones.filter(habitacion => 
      habitacion.numero.toString().includes(this.filtroNumero)
    );
  }
}