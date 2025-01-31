import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modificar-datos-personales',
  templateUrl: './modificar-datos-personales.component.html',
  styleUrls: ['./modificar-datos-personales.component.css']
})
export class ModificarDatosPersonalesComponent implements OnInit {
  usuarioSeleccionado: Usuario | null = null;
  confirmPassword: string = ''; // Agregar confirmPassword temporalmente

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario(): void {
    const idUsuario = JSON.parse(localStorage.getItem('datosUsuario') || '{}').id_usuario;
    this.usuarioService.obtenerUsuario(idUsuario).subscribe(
      (response: any) => {
        if (response.codigo === 200 && response.payload.length > 0) {
          this.usuarioSeleccionado = response.payload[0];
        } else {
          this.snackBar.open('Error al cargar los datos del usuario', 'Cerrar', { duration: 3000 });
        }
      },
      (error) => {
        this.snackBar.open('Error al cargar los datos del usuario', 'Cerrar', { duration: 3000 });
      }
    );
  }

  guardarUsuario(): void {
    if (this.usuarioSeleccionado && this.usuarioSeleccionado.id_usuario) {
      const usuario = { ...this.usuarioSeleccionado };

      // Validar que las contraseñas coincidan
      if (usuario.password && usuario.password !== this.confirmPassword) {
        this.snackBar.open('Las contraseñas no coinciden', 'Cerrar', { duration: 3000 });
        return;
      }

      // Si los campos de contraseña están vacíos, eliminarlos del objeto usuario
      if (!usuario.password) {
        delete usuario.password;
      }

      this.usuarioService.actualizarUsuario(this.usuarioSeleccionado.id_usuario, usuario).subscribe(
        (response: any) => {
          if (response.codigo === 200) {
            this.snackBar.open('Datos actualizados con éxito', 'Cerrar', { duration: 3000 });
            // Actualizar localStorage con los nuevos datos del usuario, sin incluir la contraseña
            const updatedUser = { ...JSON.parse(localStorage.getItem('datosUsuario') || '{}'), ...usuario };
            delete updatedUser.password;
            localStorage.setItem('datosUsuario', JSON.stringify(updatedUser));
            this.router.navigate(['/reserva-page']); // Redirigir a la página de reserva
          } else {
            this.snackBar.open(response.mensaje, 'Cerrar', { duration: 3000 });
          }
        },
        (error) => {
          this.snackBar.open('Error al actualizar los datos', 'Cerrar', { duration: 3000 });
        }
      );
    }
  }

  cancelar(): void {
    this.router.navigate(['/reserva-page']); // Redirigir a la página de reserva
  }
}