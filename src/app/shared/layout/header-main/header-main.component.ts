import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.css']
})
export class HeaderMainComponent implements OnInit {
  nombreUsuario: string = "";
  tipoUsuario: string = "";

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombre') || "";
    this.tipoUsuario = localStorage.getItem('rol') || "";
  }

  cerrarSesion() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}