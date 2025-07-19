// core/interceptors/mock-api.interceptor.ts
import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ICliente } from '../../shared';

const clientes: ICliente[] = [];

export const mockApiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const { url, method, body } = req;

  if (url.endsWith('/api/clientes') && method === 'GET') {
    return of(new HttpResponse({ status: 200, body: clientes })).pipe(delay(300));
  }

  if (url.endsWith('/api/clientes') && method === 'POST') {
    const novo = { ...body, id: Date.now() };
    clientes.push(novo);
    return of(new HttpResponse({ status: 201, body: novo })).pipe(delay(300));
  }

  if (url.match(/\/api\/clientes\/\d+$/) && method === 'PUT') {
    const id = parseInt(url.split('/').pop()!, 10);
    const index = clientes.findIndex(c => c.id === id);
    if (index > -1) clientes[index] = body;
    return of(new HttpResponse({ status: 200, body })).pipe(delay(300));
  }

  if (url.match(/\/api\/clientes\/\d+$/) && method === 'DELETE') {
    const id = parseInt(url.split('/').pop()!, 10);
    const index = clientes.findIndex(c => c.id === id);
    if (index > -1) clientes.splice(index, 1);
    return of(new HttpResponse({ status: 204 })).pipe(delay(300));
  }

  return next(req);
};
