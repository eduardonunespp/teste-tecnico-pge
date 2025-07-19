import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICliente } from '../../shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private baseUrl = '/api/clientes';

  constructor(private http: HttpClient) {}

  criar(cliente: ICliente): Observable<ICliente> {
    return this.http.post<ICliente>(this.baseUrl, cliente);
  }

  listar(): Observable<ICliente[]> {
    return this.http.get<ICliente[]>(this.baseUrl);
  }

  atualizar(id: number, cliente: ICliente): Observable<ICliente> {
    return this.http.put<ICliente>(`${this.baseUrl}/${id}`, cliente);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
