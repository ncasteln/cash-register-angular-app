import { Component, EventEmitter, Input, Output, Signal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category, TLayoutMode } from '../../models';
import { NgClass } from '@angular/common';

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
  @Output() onSelectionChange = new EventEmitter<TLayoutMode>();
  @Output() onCategoryChange = new EventEmitter<Category | string>();
  @Output() resetDatabase = new EventEmitter();

  readonly categories = [
    { cat: 'all', text: 'Tutti' },
    { cat: 'vegetable', text: 'Verdura e frutta' },
    { cat: 'animal', text: 'Uova, salumi, latticini' },
    { cat: 'baked', text: 'Prodotti da forno' },
    { cat: 'other', text: 'Altro' },
    { cat: 'deleted', text: 'Rimossi' }
  ]

  selectedCategory = signal<Category | string>('all')

  onClickView( view: TLayoutMode ) { this.onSelectionChange.emit(view); }
  onClickReset() { this.resetDatabase.emit(); }
  onClickCategory( category: Category | string ) {
    this.selectedCategory.set(category)
    this.onCategoryChange.emit(category)
  }
}
