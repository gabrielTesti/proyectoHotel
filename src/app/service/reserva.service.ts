import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitacion } from '../interfaces/habitacion';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrl = 'http://localhost:4000/api'; 

  constructor(private http: HttpClient) { }

  obtenerReservas(): Observable<{ payload: Habitacion[] }> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<{ payload: Habitacion[] }>(`${this.apiUrl}/obtenerReservas`, { headers });
  }

  obtenerReservaUsuario(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${this.apiUrl}/obtenerReservaUsuario/${id}`, { headers });
  }

  crearReserva(datosReserva: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<any>(`${this.apiUrl}/crearReserva`, datosReserva, { headers });
  }

  actualizarReserva(id: number, datosReserva: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<any>(`${this.apiUrl}/actualizarReserva/${id}`, datosReserva, { headers });
  }
}