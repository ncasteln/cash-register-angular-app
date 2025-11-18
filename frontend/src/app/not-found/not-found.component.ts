import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  constructor( private _router: Router ) {}

  onClick() {
    this._router.navigate(['/'])
  }
}
