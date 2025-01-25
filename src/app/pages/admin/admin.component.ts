import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  nombreUsuario: string = '';
  rolUsuario: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const datosUsuario = JSON.parse(localStorage.getItem('datosUsuario') || '{}');
    this.nombreUsuario = datosUsuario.nombre || 'Usuario';
    this.rolUsuario = datosUsuario.rol || 'Desconocido';
  }

  cerrarSesion(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}