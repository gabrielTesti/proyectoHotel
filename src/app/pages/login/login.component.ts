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
    this.loginService.login(this.usuario, this.password).subscribe(
      (response: any) => {
        if (response.codigo === 200) {
          this.dialogRef.close({ success: true, userName: response.payload[0].nombre });
          this.router.navigate(['/reserva-page']);
        } else {
          alert(response.mensaje);
        }
      },
      (error) => {
        alert('Error al iniciar sesión');
      }
    );
  }

  cancel(): void {
    this.dialogRef.close();
  }
}