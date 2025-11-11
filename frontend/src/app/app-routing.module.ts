import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { PromocionesComponent } from './pages/promociones/promociones.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ProductosAdminComponent } from './pages/productos-admin/productos-admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'Home' } },
  { path: 'nosotros', component: NosotrosComponent, data: { animation: 'Nosotros' } },
  { path: 'productos', component: ProductosComponent, data: { animation: 'Productos' } },
  { path: 'promociones', component: PromocionesComponent, data: { animation: 'Promociones' } },
  { path: 'carrito', component: CarritoComponent, data: { animation: 'Carrito' } },
  { path: 'auth', component: AuthComponent, data: { animation: 'Auth' } },
  { path: 'admin/productos', component: ProductosAdminComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}





