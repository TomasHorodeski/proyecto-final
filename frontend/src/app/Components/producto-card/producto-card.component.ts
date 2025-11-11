import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from '../../interfaces/producto.interface';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.css']
})
export class ProductoCardComponent {
  @Input() producto!: Producto;
  @Output() add = new EventEmitter<Producto>();

  constructor(private cart: CarritoService) {}

  addClicked() {
    this.cart.add(this.producto, 1);
    this.add.emit(this.producto);
  }
}









