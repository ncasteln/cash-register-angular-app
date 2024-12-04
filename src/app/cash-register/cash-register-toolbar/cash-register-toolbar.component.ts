import { Component, EventEmitter, Output } from '@angular/core';
import { TDisplayMode } from '../../models';

@Component({
  selector: 'cash-register-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './cash-register-toolbar.component.html',
  styleUrl: './cash-register-toolbar.component.scss'
})
export class CashRegisterToolbarComponent {
  @Output() onSelectionChange = new EventEmitter<TDisplayMode>()

  toggleDisplayMode( mode: TDisplayMode ) {
    this.onSelectionChange.emit(mode)
  }
}
