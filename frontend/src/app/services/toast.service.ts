import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastMsg = { id:number; text:string; type:'ok'|'warn' };

@Injectable({ providedIn:'root' })
export class ToastService{
  private list: ToastMsg[] = [];
  private counter = 0;
  stream$ = new BehaviorSubject<ToastMsg[]>([]);

  show(text: string, type: 'ok'|'warn' = 'ok', ms = 2200){
    const msg: ToastMsg = { id: ++this.counter, text, type };
    this.list = [...this.list, msg];
    this.stream$.next(this.list);
    setTimeout(() => {
      this.list = this.list.filter(m => m.id !== msg.id);
      this.stream$.next(this.list);
    }, ms);
  }
}
