import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nombre = '';
  apellido = '';
  email = '';
  password = '';
  confirmPassword = '';
  dni = '';
  fecha_nacimiento = '';
  telefono = '';

  constructor(
    private dialogRef: MatDialogRef<RegisterComponent>,
    private usuarioService: UsuarioService
  ) {}

  registrarUsuario(): void {
    if (this.password !== this.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    const usuario: Usuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      password: this.password,
      dni: this.dni,
      fecha_nacimiento: this.fecha_nacimiento,
      telefono: this.telefono,
      rol: 'huesped'
    };

    this.usuarioService.crearUsuario(usuario).subscribe(
      (response: any) => {
        if (response.codigo === 200) {
          alert('Usuario registrado con éxito');
          this.dialogRef.close();
        } else {
          alert(response.mensaje);
        }
      },
      (error) => {
        alert('Error al registrar usuario');
      }
    );
  }

  cancel(): void {
    this.dialogRef.close();
  }
}