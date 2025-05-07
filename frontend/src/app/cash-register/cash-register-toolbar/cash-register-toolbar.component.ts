import { Component, EventEmitter, Output, signal } from '@angular/core';
import { categories, Category, TLayoutMode } from '../../models';
import { NgClass } from '@angular/common';

@Component({
  selector: 'cash-register-toolbar',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './cash-register-toolbar.component.html',
  styleUrl: './cash-register-toolbar.component.scss'
})
export class CashRegisterToolbarComponent {
  readonly categories = categories;
  @Output() onViewChange = new EventEmitter<TLayoutMode>()
  @Output() onCategoryChange = new EventEmitter();
  selectedCategory = signal<Category | string>('all')

  toggleDisplayMode( mode: TLayoutMode ) {
    this.onViewChange.emit(mode)
  }

  onClickCategory( category: Category | string ) {
    this.selectedCategory.set(category)
    this.onCategoryChange.emit(category)
  }
}
