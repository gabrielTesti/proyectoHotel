/* import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private router: Router,
    private snackBar: MatSnackBar
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
              this.snackBar.open('Token is undefined', 'Cerrar', { duration: 3000 });
            }
            if (response.payload && response.payload.length > 0) {
              const user = response.payload[0];
              localStorage.setItem('datosUsuario', JSON.stringify(user));
              if (user.rol) {
                localStorage.setItem('rol', user.rol);
                this.redirigirSegunRol(user.rol);
              } else {
                console.error('Rol is undefined');
                this.snackBar.open('Rol is undefined', 'Cerrar', { duration: 3000 });
              }
            } else {
              console.error('Payload is undefined or empty');
              this.snackBar.open('Payload is undefined or empty', 'Cerrar', { duration: 3000 });
            }
          } else {
            console.error('Error de login', response.mensaje);
            this.snackBar.open(response.mensaje || 'Usuario o contraseña incorrecta', 'Cerrar', { duration: 3000 });
          }
        },
        error => {
          console.error('Error en la petición', error);
          this.snackBar.open('Ocurrió un error en el login', 'Cerrar', { duration: 3000 });
        }
      );
    } else {
      console.error('Nombre o contraseña no pueden estar vacíos');
      this.snackBar.open('Nombre o contraseña no pueden estar vacíos', 'Cerrar', { duration: 3000 });
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
        this.snackBar.open('Rol desconocido', 'Cerrar', { duration: 3000 });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
} */









  import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private router: Router,
    private snackBar: MatSnackBar
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
              this.snackBar.open('Token is undefined', 'Cerrar', { duration: 3000 });
            }
            if (response.payload && response.payload.length > 0) {
              const user = response.payload[0];
              localStorage.setItem('datosUsuario', JSON.stringify(user));
              localStorage.setItem('nombre', user.nombre); // Almacenar el nombre del usuario
              if (user.rol) {
                localStorage.setItem('rol', user.rol);
                this.redirigirSegunRol(user.rol);
              } else {
                console.error('Rol is undefined');
                this.snackBar.open('Rol is undefined', 'Cerrar', { duration: 3000 });
              }
            } else {
              console.error('Payload is undefined or empty');
              this.snackBar.open('Payload is undefined or empty', 'Cerrar', { duration: 3000 });
            }
          } else {
            console.error('Error de login', response.mensaje);
            this.snackBar.open(response.mensaje || 'Usuario o contraseña incorrecta', 'Cerrar', { duration: 3000 });
          }
        },
        error => {
          console.error('Error en la petición', error);
          this.snackBar.open('Ocurrió un error en el login', 'Cerrar', { duration: 3000 });
        }
      );
    } else {
      console.error('Nombre o contraseña no pueden estar vacíos');
      this.snackBar.open('Nombre o contraseña no pueden estar vacíos', 'Cerrar', { duration: 3000 });
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
        this.snackBar.open('Rol desconocido', 'Cerrar', { duration: 3000 });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}