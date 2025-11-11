import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Categoria } from '../interfaces/categoria.interface';
import { Producto } from '../interfaces/producto.interface';

@Injectable({ providedIn: 'root' })
export class AlmacenService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  categorias(): Observable<Categoria[]> {
    return this.http.get<{ ok: boolean; data: Categoria[] }>(`${this.base}/categorias`)
      .pipe(map(r => r.data ?? []));
  }

  productos(q?: string): Observable<Producto[]> {
    let params = new HttpParams();
    if (q) params = params.set('q', q);
    return this.http.get<{ ok: boolean; data: any[] }>(`${this.base}/productos`, { params })
      .pipe(map(r => (r.data ?? []).map(p => this.normalizeProducto(p))));
  }

  promociones(): Observable<Producto[]> {
    return this.http.get<{ ok: boolean; data: any[] }>(`${this.base}/promociones`)
      .pipe(map(r => (r.data ?? []).map(p => this.normalizeProducto(p))));
  }

  private normalizeProducto(p: any): Producto {
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





