import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Producto } from '../interfaces/producto.interface';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private base = `${environment.apiUrl}/productos`;

  constructor(private http: HttpClient) {}

  list(q?: string): Observable<Producto[]> {
    let params = new HttpParams();
    if (q) params = params.set('q', q);

    return this.http
      .get<{ ok: boolean; data: any[] }>(this.base, { params })
      .pipe(map(r => (r.data ?? []).map(p => this.normalize(p))));
  }

  get(id: number): Observable<Producto> {
    return this.http
      .get<{ ok: boolean; data: any }>(`${this.base}/${id}`)
      .pipe(map(r => this.normalize(r.data)));
  }

  create(body: Omit<Producto, 'id'>): Observable<Producto> {
    return this.http
      .post<{ ok: boolean; data: any }>(this.base, body)
      .pipe(map(r => this.normalize(r.data)));
  }

  update(id: number, body: Partial<Omit<Producto, 'id'>>): Observable<Producto> {
    return this.http
      .put<{ ok: boolean; data: any }>(`${this.base}/${id}`, body)
      .pipe(map(r => this.normalize(r.data)));
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  private normalize(p: any): Producto {
    return {
      id: Number(p.id),
      subcategoria_id: Number(p.subcategoria_id),
      nombre: String(p.nombre ?? ''),
      descripcion: String(p.descripcion ?? ''),
      precio: Number(p.precio ?? 0),
      imagen: String(p.imagen ?? ''),
    };
  }
}

