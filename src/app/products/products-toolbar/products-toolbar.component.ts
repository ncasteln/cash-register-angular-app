import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'products-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './products-toolbar.component.html',
  styleUrl: './products-toolbar.component.scss',
  host: {
    class: 'row align-items-center'
  }
})
export class ProductsToolbarComponent {
  @Output() onSelectionChange = new EventEmitter<'list' | 'grid'>();
  @Output() resetDatabase = new EventEmitter();

  onClickView( view: 'list' | 'grid') { this.onSelectionChange.emit(view); }
  onClickReset() { this.resetDatabase.emit(); }
}
