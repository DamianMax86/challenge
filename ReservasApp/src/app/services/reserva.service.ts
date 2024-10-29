import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:5183/api/reservas';

  constructor(private http: HttpClient) {}

  getReservaById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getReservas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listar`);
  }

  createReserva(reserva: any): Observable<any> {
    return this.http.post(this.apiUrl, reserva);
  }

  updateReserva(id: number, reserva: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, reserva);
  }

  deleteReservaById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  buscarReservas(nombreCliente: string, fecha: string | null): Observable<any[]> {
    let params: any = {};
    if (nombreCliente) params.nombreCliente = nombreCliente;
    if (fecha) params.fecha = fecha;
    let url='buscar';
    return this.http.get<any[]>(`${this.apiUrl}/${url}`, { params });
  }
}
