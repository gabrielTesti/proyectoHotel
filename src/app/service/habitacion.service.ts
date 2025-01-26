import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitacion } from '../interfaces/habitacion';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  private API_URL = 'http://localhost:4000/api'; // Asegúrate de que la URL coincida con tu configuración de backend

  constructor(private http: HttpClient) { }

  obtenerHabitaciones(): Observable<any> {
    return this.http.get(`${this.API_URL}/obtenerHabitaciones`);
  }

  obtenerHabitacion(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/obtenerHabitacion/${id}`);
  }

  crearHabitacion(habitacion: Habitacion): Observable<any> {
    return this.http.post(`${this.API_URL}/crearHabitacion`, habitacion);
  }

  actualizarHabitacion(id: number, habitacion: Habitacion): Observable<any> {
    return this.http.put(`${this.API_URL}/actualizarHabitacion/${id}`, habitacion);
  }
}