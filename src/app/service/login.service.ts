import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:4000/api'; 
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) { }

  login(usuario: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { usuario, password }).pipe(
      tap(response => {
        if (response.codigo === 200 && response.payload && response.payload.length > 0) {
          localStorage.setItem('token', response.jwt);
          localStorage.setItem('datosUsuario', JSON.stringify(response.payload[0])); 
          this.loggedInSubject.next(true);
        } else {
          throw new Error('Respuesta del servidor no válida');
        }
      })
    );
  }

  logout(): void {
    localStorage.clear(); 
    this.loggedInSubject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}