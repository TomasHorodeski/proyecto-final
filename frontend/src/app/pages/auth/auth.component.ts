import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  email = 'admin@demo.com';
  password = 'admin123';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.loading = true; this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: (resp) => {
        this.loading = false;
        if (resp.ok) this.router.navigateByUrl('/productos');
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Error de login';
      }
    });
  }
}



