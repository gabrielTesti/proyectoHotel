import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = '';
  password = '';

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private loginService: LoginService,
    private router: Router
  ) {}

  login(): void {
    if (this.usuario && this.password) {
      this.loginService.login(this.usuario, this.password).subscribe(
        (response: any) => {
          console.log('Respuesta del backend:', response); // Añadir log para verificar la respuesta
          if (response.codigo === 200) {
            console.log('Login exitoso', response);
            if (response.jwt) {
              localStorage.setItem('token', response.jwt);
            } else {
              console.error('Token is undefined');
              alert('Token is undefined');
            }
            if (response.payload && response.payload.length > 0) {
              const user = response.payload[0];
              localStorage.setItem('datosUsuario', JSON.stringify(user));
              if (user.rol) {
                localStorage.setItem('rol', user.rol);
                this.redirigirSegunRol(user.rol);
              } else {
                console.error('Rol is undefined');
                alert('Rol is undefined');
              }
            } else {
              console.error('Payload is undefined or empty');
              alert('Payload is undefined or empty');
            }
          } else {
            console.error('Error de login', response.mensaje);
            alert(response.mensaje || 'Usuario o contraseña incorrecta');
          }
        },
        error => {
          console.error('Error en la petición', error);
          alert('Ocurrió un error en el login');
        }
      );
    } else {
      console.error('Nombre o contraseña no pueden estar vacíos');
      alert('Nombre o contraseña no pueden estar vacíos');
    }
  }

  redirigirSegunRol(rol: string) {
    switch (rol) {
      case 'administrador':
        this.router.navigate(['/admin']).then(() => this.dialogRef.close());
        break;
      case 'operador':
        this.router.navigate(['/operador']).then(() => this.dialogRef.close());
        break;
      case 'huesped':
        this.router.navigate(['/reserva-page']).then(() => this.dialogRef.close());
        break;
      default:
        console.error('Rol desconocido:', rol);
        alert('Rol desconocido');
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}