import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private _dialog = new Subject();
  public dialog$ = this._dialog.asObservable()

  constructor() {}

  open() {

  }

  close() {

  }
}
