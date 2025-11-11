import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  images = [
    'assets/images/banners/banner1.png',
    'assets/images/banners/banner2.png'
  ];
  idx = 0;
  intervalId: any;

  ngOnInit(): void {
    this.intervalId = setInterval(() => this.next(), 5000);
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  next(): void { this.idx = (this.idx + 1) % this.images.length; }
  prev(): void { this.idx = (this.idx - 1 + this.images.length) % this.images.length; }
  go(i: number): void { this.idx = i; }
}









