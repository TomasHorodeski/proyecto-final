import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ProductoCardComponent } from './Components/producto-card/producto-card.component';
import { ProductModalComponent } from './Components/product-modal/product-modal.component';

import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { PromocionesComponent } from './pages/promociones/promociones.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { AuthComponent } from './pages/auth/auth.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { ProductosAdminComponent } from './pages/productos-admin/productos-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ProductoCardComponent,
    ProductModalComponent,
    HomeComponent,
    ProductosComponent,
    PromocionesComponent,
    NosotrosComponent,
    CarritoComponent,
    AuthComponent,
    ProductosAdminComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}







