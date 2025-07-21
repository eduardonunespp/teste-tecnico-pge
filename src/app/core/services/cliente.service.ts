import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICliente } from '../../shared';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import * as Cache from '../../core/adapters/cache';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private baseUrl = '/api/clientes';
  private storageKey = 'clientes';

  constructor(private http: HttpClient) {}

  listar(): Observable<ICliente[]> {
    const cached = Cache.get<ICliente[]>({ key: this.storageKey });

    if (cached) {
      return of(cached).pipe(delay(200));
    }

    return this.http.get<ICliente[]>(this.baseUrl).pipe(
      tap((clientes) => {
        Cache.set({ key: this.storageKey, value: clientes });
      })
    );
  }

  listarDoCache(): ICliente[] {
    return Cache.get<ICliente[]>({ key: this.storageKey }) || [];
  }

  criar(cliente: ICliente): Observable<ICliente> {
    return this.http.post<ICliente>(this.baseUrl, cliente).pipe(
      tap((novoCliente) => {
        const lista = Cache.get<ICliente[]>({ key: this.storageKey }) || [];

        Cache.set({ key: this.storageKey, value: [...lista, novoCliente] });
      })
    );
  }

  atualizar(id: number, cliente: ICliente): Observable<ICliente> {
    return this.http.put<ICliente>(`${this.baseUrl}/${id}`, cliente).pipe(
      tap((atualizado) => {
        const lista = Cache.get<ICliente[]>({ key: this.storageKey }) || [];

        const novaLista = lista.map((c) => (c.id === id ? atualizado : c));
        Cache.set({ key: this.storageKey, value: novaLista });
      })
    );
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        const lista = Cache.get<ICliente[]>({ key: this.storageKey }) || [];

        const novaLista = lista.filter((c) => c.id !== id);
        Cache.set({ key: this.storageKey, value: novaLista });
      })
    );
  }
}
