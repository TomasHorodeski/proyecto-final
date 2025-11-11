import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface LoginResp {
  ok: boolean;
  token: string;
  user: { id: number; nombre: string; email: string };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${environment.apiUrl}/auth`;
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResp> {
    return this.http.post<LoginResp>(`${this.base}/login`, { email, password })
      .pipe(
        tap((resp) => {
          if (resp?.ok && resp.token) {
            localStorage.setItem(this.tokenKey, resp.token);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLogged(): boolean {
    return !!this.token;
  }
}



