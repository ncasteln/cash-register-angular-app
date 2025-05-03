import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TLayoutMode } from '../../models';

@Component({
  selector: 'products-toolbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './products-toolbar.component.html',
  styleUrl: './products-toolbar.component.scss'
})
export class ProductsToolbarComponent {
  @Output() onSelectionChange = new EventEmitter<TLayoutMode>();
  @Output() resetDatabase = new EventEmitter();

  onClickView( view: TLayoutMode ) { this.onSelectionChange.emit(view); }
  onClickReset() { this.resetDatabase.emit(); }
}
