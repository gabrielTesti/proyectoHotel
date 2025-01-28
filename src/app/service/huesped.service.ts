import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Huesped } from '../interfaces/huesped';

@Injectable({
  providedIn: 'root'
})
export class HuespedService {
  private apiUrl = 'http://localhost:4000/api'; // Ajusta esta URL según sea necesario

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Asumiendo que el token se almacena en localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  obtenerHuespedReserva(id: number): Observable<{ codigo: number, mensaje: string, payload: Huesped[] }> {
    return this.http.get<{ codigo: number, mensaje: string, payload: Huesped[] }>(`${this.apiUrl}/obtenerHuespedReserva/${id}`, { headers: this.getHeaders() });
  }

  agregarHuespedes(huesped: Huesped): Observable<{ codigo: number, mensaje: string, payload: any[] }> {
    return this.http.post<{ codigo: number, mensaje: string, payload: any[] }>(`${this.apiUrl}/agregarHuespedes`, huesped, { headers: this.getHeaders() });
  }

  actualizarHuespedes(id: number, huesped: Huesped): Observable<{ codigo: number, mensaje: string, payload: any[] }> {
    return this.http.put<{ codigo: number, mensaje: string, payload: any[] }>(`${this.apiUrl}/actualizarHuespedes/${id}`, huesped, { headers: this.getHeaders() });
  }
}