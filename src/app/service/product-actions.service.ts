import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductActionsService {
  private _selectedAction = new BehaviorSubject<string[]>(['','']);
  public selectedAction$ = this._selectedAction.asObservable();

  constructor() {}

  select( action: string, productName: string ) {
    this._selectedAction.next([action, productName]);
  }
}
