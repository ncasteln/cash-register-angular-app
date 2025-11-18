import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToastService {

  constructor(private snackBar: MatSnackBar) {}

  success(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
      panelClass: ['toast-success'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  error(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
      panelClass: ['toast-error'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
