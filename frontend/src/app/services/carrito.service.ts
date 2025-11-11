import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen?: string; 
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image?: string; 
}

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private readonly _items$ = new BehaviorSubject<CartItem[]>([]);
  readonly items$ = this._items$.asObservable();

  get items(): CartItem[] { return this._items$.value; }
  private set items(v: CartItem[]) { this._items$.next(v); }

  get total(): number { return this.getTotal(); }

  add(p: Producto, cantidad = 1) {
    const items = [...this.items];
    const idx = items.findIndex(i => i.productId === p.id);
    if (idx >= 0) {
      items[idx] = { ...items[idx], quantity: items[idx].quantity + cantidad };
    } else {
      items.push({
        productId: p.id,
        name: p.nombre,
        price: p.precio,
        quantity: cantidad,
        image: p.imagen
      });
    }
    this.items = items;
  }

  changeQty(productId: number, delta: number) {
    this.items = this.items.map(i =>
      i.productId === productId
        ? { ...i, quantity: Math.max(1, i.quantity + delta) }
        : i
    );
  }

  setQty(productId: number, qty: number) {
    const q = Number.isFinite(qty) ? Math.max(1, Math.floor(qty)) : 1;
    this.items = this.items.map(i => i.productId === productId ? { ...i, quantity: q } : i);
  }

  remove(productId: number) { this.items = this.items.filter(i => i.productId !== productId); }
  clear() { this.items = []; }

  getTotal(): number {
    return this.items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  }

  whatsAppLink(): string {
    const lines = this.items.map(i => `• ${i.name} x${i.quantity} — $${i.price}`);
    const txt = `Pedido:\n${lines.join('\n')}\nTotal: $${this.getTotal()}`;
    return `https://wa.me/549?text=${encodeURIComponent(txt)}`;
  }
}










