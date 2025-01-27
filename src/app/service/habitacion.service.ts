import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitacion } from '../interfaces/habitacion';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  private API_URL = 'http://localhost:4000/api'; // Asegúrate de que la URL coincida con tu configuración de backend

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Asumiendo que el token se almacena en localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  obtenerHabitaciones(): Observable<any> {
    return this.http.get(`${this.API_URL}/obtenerHabitaciones`, { headers: this.getHeaders() });
  }

  obtenerHabitacion(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/obtenerHabitacion/${id}`, { headers: this.getHeaders() });
  }

  crearHabitacion(habitacion: Habitacion): Observable<any> {
    return this.http.post(`${this.API_URL}/crearHabitacion`, habitacion, { headers: this.getHeaders() });
  }

  actualizarHabitacion(id: number, habitacion: Habitacion): Observable<any> {
    return this.http.put(`${this.API_URL}/actualizarHabitacion/${id}`, habitacion, { headers: this.getHeaders() });
  }
}