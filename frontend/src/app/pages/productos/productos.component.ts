import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  loading = false;
  error = '';

  constructor(private svc: ProductosService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(() => this.load());
  }

  load(): void {
    this.loading = true; this.error = '';
    const q = this.route.snapshot.queryParamMap.get('q') || undefined;

    this.svc.list(q).subscribe({
      next: (rows) => { this.productos = rows; this.loading = false; },
      error: (e) => { this.loading = false; this.error = e?.error?.message || 'Error cargando productos'; }
    });
  }

  added(_p: Producto) {
  }
}






