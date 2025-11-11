import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarritoComponent {
  items$!: Observable<any[]>;
  total$!: Observable<number>;

  constructor(public cart: CarritoService) {
    this.items$ = this.cart.items$;
    this.total$ = this.cart.items$.pipe(map(() => this.cart.getTotal()));
  }

  inc(id: number) { this.cart.changeQty(id, +1); }
  dec(id: number) { this.cart.changeQty(id, -1); }
  rm(id: number)  { this.cart.remove(id); }
  setQty(id: number, ev: Event) {
    const val = Number((ev.target as HTMLInputElement).value);
    this.cart.setQty(id, val);
  }

  trackById = (_index: number, item: { productId: number }) => item.productId;

  waLink(): string { return this.cart.whatsAppLink(); }
  vaciar() { this.cart.clear(); }
}











