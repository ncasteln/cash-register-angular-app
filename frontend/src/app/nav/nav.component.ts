import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateDatePipe } from '../pipes/translate-date.pipe';
import { formatDate } from '@angular/common';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslateDatePipe
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  id_date: string | null = null;
  fullDate: string | null = null;
  isLogged = false;

  constructor( private _authService: AuthService ) {}

  ngOnInit(): void {
    this.isLogged = this._authService.isLoggedIn();

    const today = Date.now();
    this.fullDate = formatDate(today, 'fullDate', 'en-US');
    this.id_date = formatDate(today, 'dd-MM-yyyy', 'en-US');
  }

  onSignout() {
    this._authService.signout();
    this.isLogged = false;
  }
}
