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

  obtenerUsuarios(): Observable<{ codigo: number, mensaje: string, payload: Usuario[] }> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<{ codigo: number, mensaje: string, payload: Usuario[] }>(`${this.apiUrl}/obtenerUsuarios`, { headers });
  }

  obtenerUsuario(id: number): Observable<{ codigo: number, mensaje: string, payload: Usuario[] }> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<{ codigo: number, mensaje: string, payload: Usuario[] }>(`${this.apiUrl}/obtenerUsuario/${id}`, { headers });
  }

  crearUsuario(usuario: Usuario): Observable<{ codigo: number, mensaje: string, payload: any[] }> {
    return this.http.post<{ codigo: number, mensaje: string, payload: any[] }>(`${this.apiUrl}/crearUsuario`, usuario);
  }

  actualizarUsuario(id: number, usuario: Usuario): Observable<{ codigo: number, mensaje: string, payload: any[] }> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<{ codigo: number, mensaje: string, payload: any[] }>(`${this.apiUrl}/actualizarUsuario/${id}`, usuario, { headers });
  }
}