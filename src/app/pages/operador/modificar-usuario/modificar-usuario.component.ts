import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent implements OnInit {
  nombre: string = '';
  apellido: string = '';
  dni: string = '';
  usuarios: Usuario[] = [];
  usuarioSeleccionado: Usuario | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {}

  buscarUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(response => {
      if (response.codigo === 200) {
        this.usuarios = response.payload.filter(usuario => 
          (this.nombre ? usuario.nombre.includes(this.nombre) : true) &&
          (this.apellido ? usuario.apellido.includes(this.apellido) : true) &&
          (this.dni ? usuario.dni.includes(this.dni) : true)
        );
      } else {
        this.snackBar.open('Error al buscar usuarios', 'Cerrar', {
          duration: 3000,
        });
      }
    }, error => {
      console.error('Error al buscar usuarios', error);
      this.snackBar.open('Error al buscar usuarios', 'Cerrar', {
        duration: 3000,
      });
    });
  }

  seleccionarUsuario(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
  }

  guardarUsuario() {
    if (this.usuarioSeleccionado && this.usuarioSeleccionado.id_usuario) {
      this.usuarioService.actualizarUsuario(this.usuarioSeleccionado.id_usuario, this.usuarioSeleccionado).subscribe(response => {
        if (response.codigo === 200) {
          this.snackBar.open('Usuario actualizado exitosamente', 'Cerrar', {
            duration: 3000,
          });
          this.usuarioSeleccionado = null;
          this.usuarios = [];
        } else {
          this.snackBar.open('Error al actualizar el usuario', 'Cerrar', {
            duration: 3000,
          });
        }
      }, error => {
        console.error('Error al actualizar el usuario', error);
        this.snackBar.open('Error al actualizar el usuario', 'Cerrar', {
          duration: 3000,
        });
      });
    }
  }

  cancelar() {
    this.usuarioSeleccionado = null;
  }
}