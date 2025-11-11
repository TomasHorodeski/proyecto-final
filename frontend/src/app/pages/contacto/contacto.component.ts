import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  nombre=''; email=''; mensaje='';
  enviar(){ alert('Gracias por escribirnos, te responderemos pronto.'); this.nombre=this.email=this.mensaje=''; }
}
