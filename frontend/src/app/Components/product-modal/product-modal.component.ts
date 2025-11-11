import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from '../../interfaces/producto.interface';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent {
  @Input() producto!: Producto;
  @Output() close = new EventEmitter<void>();

  cantidad = 1;

  constructor(private carrito: CarritoService) {}

  inc() { this.cantidad++; }
  dec() { this.cantidad = Math.max(1, this.cantidad - 1); }

  add() {
    this.carrito.add(this.producto, this.cantidad);
    this.close.emit();
  }
}







