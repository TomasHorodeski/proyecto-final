import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-productos-admin',
  templateUrl: './productos-admin.component.html',
  styleUrls: ['./productos-admin.component.css']
})
export class ProductosAdminComponent implements OnInit {
  q = '';
  productos: Producto[] = [];
  editing: Partial<Producto> | null = null;
  loading = false;
  error = '';

  constructor(private productosSvc: ProductosService) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading = true; this.error = '';
    this.productosSvc.list(this.q || undefined).subscribe({
      next: (rows) => { this.productos = rows; this.loading = false; },
      error: (e) => { this.loading = false; this.error = e?.error?.message || 'Error cargando productos'; }
    });
  }

  buscar(): void { this.fetch(); }

  nuevo(): void {
    this.editing = {
      nombre: '',
      descripcion: '',
      precio: 0,
      subcategoria_id: 1,
      imagen: ''
    };
  }

  editar(p: Producto): void {
    this.editing = { ...p };
  }

  cancelar(): void {
    this.editing = null;
  }

  guardar(): void {
    if (!this.editing) return;

    const dto: Partial<Producto> = {
      nombre: this.editing.nombre ?? '',
      descripcion: this.editing.descripcion ?? '',
      precio: Number(this.editing.precio ?? 0),
      subcategoria_id: Number(this.editing.subcategoria_id ?? 1),
      imagen: this.editing.imagen ?? ''
    };

    const isNew = !this.editing.id;

    (isNew
      ? this.productosSvc.create(dto as Omit<Producto, 'id'>)
      : this.productosSvc.update(this.editing.id as number, dto)
    ).subscribe({
      next: () => { this.editing = null; this.fetch(); },
      error: (e) => { this.error = e?.error?.message || 'Error guardando'; }
    });
  }

  borrar(p: Producto): void {
    if (!p.id) return;
    if (!confirm(`¿Eliminar "${p.nombre}"?`)) return;
    this.productosSvc.remove(p.id).subscribe({
      next: () => this.fetch(),
      error: (e) => { this.error = e?.error?.message || 'Error eliminando'; }
    });
  }
}

