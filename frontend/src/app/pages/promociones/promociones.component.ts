import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto.interface';
import { AlmacenService } from '../../services/almacen.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {
  productos: Producto[] = [];
  constructor(private store: AlmacenService) {}
  ngOnInit(): void {
    this.store.promociones().subscribe(ps => this.productos = ps);
  }
}

