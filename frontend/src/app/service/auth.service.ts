import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { IUser } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  readonly apiUrl = `${environment.apiUrl}`;

  signup( email: string, password: string ) {
    const body = { email, password };
    return this.httpClient.post<IUser>(`${this.apiUrl}/user/signup`, body, { observe: 'response' });
  }

  signin( email: string, password: string ) {
    const body = { email, password };
    return this.httpClient.post<IUser>(`${this.apiUrl}/user/signin`, body, { observe: 'response' });
  }

  signout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
