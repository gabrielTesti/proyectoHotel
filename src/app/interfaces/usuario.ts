export interface Usuario {
  id_usuario?: number; // Hacer que id_usuario sea opcional
  nombre: string;
  apellido: string;
  dni: string;
  password?: string;
  email: string;
  telefono: string;
  fecha_nacimiento: string;
  rol: string;
}