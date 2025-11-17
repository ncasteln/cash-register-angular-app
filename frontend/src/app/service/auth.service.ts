import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ISigninResponse, IUser } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  readonly apiUrl = `${environment.apiUrl}`;

  signup( username: string, password: string ) {
    const body = { username, password };
    return this.httpClient.post(`${this.apiUrl}/user/signup`, body);
  }

  signin( username: string, password: string ) {
    const body = { username, password };
    return this.httpClient.post<ISigninResponse>(`${this.apiUrl}/user/signin`, body);
  }

  signout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  setToken( token: string ) {
    return localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken() {
    return localStorage.removeItem('token');
  }
}
