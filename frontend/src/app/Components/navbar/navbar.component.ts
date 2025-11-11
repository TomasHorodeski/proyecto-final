import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlmacenService } from '../../services/almacen.service';
import { Categoria, Subcategory } from '../../interfaces/categoria.interface';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  search = '';
  categoriesOpen = false;
  cartOpen = false;

  categorias: Categoria[] = [];
  mapSub: { [catId: number]: Subcategory[] } = {};

  constructor(
    private store: AlmacenService,
    private router: Router,
    public carrito: CarritoService
  ) {}

  ngOnInit(): void {
    this.store.categorias().subscribe(cs => this.categorias = cs);

    const getSubs = (this.store as any).subcategorias?.bind(this.store);
    if (getSubs) {
      getSubs().subscribe((subs: Subcategory[]) => {
        const map: { [k: number]: Subcategory[] } = {};
        for (const s of subs || []) {
          const catId = (s as any).categoria_id ?? (s as any).id_categoria ?? (s as any).catId;
          if (typeof catId === 'number') {
            (map[catId] ||= []).push(s);
          }
        }
        this.mapSub = map;
      });
    }
  }

  subByCat(catId: number): Subcategory[] {
    return this.mapSub[catId] ?? [];
  }

  toggleCategories() { this.categoriesOpen = !this.categoriesOpen; }
  closeCategories() { this.categoriesOpen = false; }

  openCart() { this.cartOpen = true; }
  closeCart() { this.cartOpen = false; }
  closeDrawers() { this.categoriesOpen = this.cartOpen = false; }

  buscar() {
    const q = this.search.trim();
    this.router.navigate(['/productos'], { queryParams: q ? { q } : {} });
    this.closeDrawers();
  }

  goCategoria(cat: string, sub?: Subcategory | string) {
    const params: any = { cat };
    if (typeof sub === 'string') params.sub = sub;
    if (typeof sub === 'object') params.sub = sub.nombre;
    this.router.navigate(['/productos'], { queryParams: params });
    this.closeDrawers();
  }
}




