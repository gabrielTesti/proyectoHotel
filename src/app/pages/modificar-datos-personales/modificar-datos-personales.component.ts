import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UsuarioService } from 'src/app/service/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-datos-personales',
  templateUrl: './modificar-datos-personales.component.html',
  styleUrls: ['./modificar-datos-personales.component.css']
})
export class ModificarDatosPersonalesComponent implements OnInit {
  usuarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      rol: ['huesped'],
      fecha_nacimiento: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      password: [''],
      confirmPassword: ['']
    }, { validator: this.passwordMatchValidator });

    this.cargarDatosUsuario();
  }

  cargarDatosUsuario(): void {
    const idUsuario = JSON.parse(localStorage.getItem('datosUsuario') || '{}').id_usuario;
    this.usuarioService.obtenerUsuario(idUsuario).subscribe(
      (response: any) => {
        if (response.codigo === 200 && response.payload.length > 0) {
          const datosUsuario = response.payload[0];
          this.usuarioForm.patchValue({
            nombre: datosUsuario.nombre,
            apellido: datosUsuario.apellido,
            email: datosUsuario.email,
            dni: datosUsuario.dni,
            fecha_nacimiento: datosUsuario.fecha_nacimiento,
            telefono: datosUsuario.telefono
          });
        } else {
          this.snackBar.open('Error al cargar los datos del usuario', 'Cerrar', { duration: 3000 });
        }
      },
      (error) => {
        this.snackBar.open('Error al cargar los datos del usuario', 'Cerrar', { duration: 3000 });
      }
    );
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  guardar(): void {
    if (this.usuarioForm.invalid) {
      return;
    }

    const usuario = this.usuarioForm.value;
    const idUsuario = JSON.parse(localStorage.getItem('datosUsuario') || '{}').id_usuario;

    // Si los campos de contraseña están vacíos, eliminarlos del objeto usuario
    if (!usuario.password) {
      delete usuario.password;
      delete usuario.confirmPassword;
    }

    this.usuarioService.actualizarUsuario(idUsuario, usuario).subscribe(
      (response: any) => {
        if (response.codigo === 200) {
          this.snackBar.open('Datos actualizados con éxito', 'Cerrar', { duration: 3000 });
          // Actualizar localStorage con los nuevos datos del usuario, sin incluir la contraseña
          const updatedUser = { ...JSON.parse(localStorage.getItem('datosUsuario') || '{}'), ...usuario };
          delete updatedUser.password;
          delete updatedUser.confirmPassword;
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

  cancelar(): void {
    this.router.navigate(['/reserva-page']); // Redirigir a la página de reserva
  }
}