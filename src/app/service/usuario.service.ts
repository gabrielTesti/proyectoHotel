import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:4000/api'; // Ajusta esta URL según sea necesario

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Asumiendo que el token se almacena en localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  obtenerUsuarios(): Observable<{ codigo: number, mensaje: string, payload: Usuario[] }> {
    return this.http.get<{ codigo: number, mensaje: string, payload: Usuario[] }>(`${this.apiUrl}/obtenerUsuarios`, { headers: this.getHeaders() });
  }

  obtenerUsuario(id: number): Observable<{ codigo: number, mensaje: string, payload: Usuario[] }> {
    return this.http.get<{ codigo: number, mensaje: string, payload: Usuario[] }>(`${this.apiUrl}/obtenerUsuario/${id}`, { headers: this.getHeaders() });
  }

  crearUsuario(usuario: Usuario): Observable<{ codigo: number, mensaje: string, payload: any[] }> {
    return this.http.post<{ codigo: number, mensaje: string, payload: any[] }>(`${this.apiUrl}/crearUsuario`, usuario);
  }

  actualizarUsuario(id: number, usuario: Usuario): Observable<{ codigo: number, mensaje: string, payload: any[] }> {
    return this.http.put<{ codigo: number, mensaje: string, payload: any[] }>(`${this.apiUrl}/actualizarUsuario/${id}`, usuario, { headers: this.getHeaders() });
  }
}