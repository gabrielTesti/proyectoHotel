import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      telefono: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  registrarUsuario(): void {
    if (this.registroForm.invalid) {
      return;
    }

    const usuario: Usuario = {
      nombre: this.registroForm.value.nombre,
      apellido: this.registroForm.value.apellido,
      email: this.registroForm.value.email,
      password: this.registroForm.value.password,
      dni: this.registroForm.value.dni,
      fecha_nacimiento: this.registroForm.value.fecha_nacimiento,
      telefono: this.registroForm.value.telefono,
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