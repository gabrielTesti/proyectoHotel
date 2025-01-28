import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';

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

  constructor(private usuarioService: UsuarioService, private router: Router) { }

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
        alert('Error al buscar usuarios');
      }
    }, error => {
      console.error('Error al buscar usuarios', error);
    });
  }

  seleccionarUsuario(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
  }

  guardarUsuario() {
    if (this.usuarioSeleccionado && this.usuarioSeleccionado.id_usuario) {
      this.usuarioService.actualizarUsuario(this.usuarioSeleccionado.id_usuario, this.usuarioSeleccionado).subscribe(response => {
        if (response.codigo === 200) {
          alert('Usuario actualizado exitosamente');
          this.usuarioSeleccionado = null;
          this.usuarios = [];
        } else {
          alert('Error al actualizar el usuario');
        }
      }, error => {
        console.error('Error al actualizar el usuario', error);
      });
    }
  }

  cancelar() {
    this.usuarioSeleccionado = null;
  }
}