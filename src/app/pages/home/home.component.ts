import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <app-header-welcome *ngIf="!isLoggedIn"></app-header-welcome>
    <app-header-main *ngIf="isLoggedIn"></app-header-main>
    
    <main>
  <div class="intro">
    <h2>Servicios de Reserva</h2>
    <p>Reserva tu habitación en línea y disfruta de las mejores tarifas en nuestro hotel. Nuestro sistema de reservas en línea es fácil de usar y seguro.</p>
  </div>

  <div class="services">
    <h3>Nuestras Habitaciones</h3>
    <div class="service">
      <h4>Habitaciones para 2 personas</h4>
      <p>El hotel ofrece habitaciones para 2 personas en formato de camas simples y dobles. Una habitación de 2 personas puede ser 1 cama doble o 2 camas simples.</p>
    </div>
    <div class="service">
      <h4>Habitaciones para 3 personas</h4>
      <p>Las habitaciones para 3 personas pueden ser, 1 cama doble y 1 cama simple o 3 camas simples.</p>
    </div>
  </div>

  <div class="images">
    <img src="assets/habitacion1.jpg" alt="Habitación 1">
    <img src="assets/habitacion2.jpg" alt="Habitación 2">
    <img src="assets/habitacion3.jpg" alt="Habitación 3">
  </div>
</main>

    <app-footer></app-footer>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoggedIn = false;






}



