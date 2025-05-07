import { Component, EventEmitter, Input, Output, Signal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category, TLayoutMode } from '../../models';
import { NgClass } from '@angular/common';
import { categories } from '../../models';

@Component({
  selector: 'products-toolbar',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './products-toolbar.component.html',
  styleUrl: './products-toolbar.component.scss'
})
export class ProductsToolbarComponent {
  readonly categories = categories;
  @Output() onViewChange = new EventEmitter<TLayoutMode>();
  @Output() onCategoryChange = new EventEmitter<Category | string>();
  @Output() resetDatabase = new EventEmitter();

  selectedCategory = signal<Category | string>('all')

  onClickView( view: TLayoutMode ) { this.onViewChange.emit(view); }
  onClickReset() { this.resetDatabase.emit(); }
  onClickCategory( category: Category | string ) {
    this.selectedCategory.set(category)
    this.onCategoryChange.emit(category)
  }
}
