import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService, ToastMsg } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy{
  toasts: ToastMsg[] = [];
  private sub?: Subscription;

  constructor(private toast: ToastService){
    this.sub = this.toast.stream$.subscribe(list => this.toasts = list);
  }
  ngOnDestroy(){ this.sub?.unsubscribe(); }
}



