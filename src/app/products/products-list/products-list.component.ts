import { Component, input, Input, NgModule, OnInit } from '@angular/core';
import { DynamicTableComponent } from '../../dynamic-table/dynamic-table.component';
import { DecimalPipe } from '@angular/common';
import { IProduct } from '../../models';
import { ProductActionsComponent } from '../product-actions/product-actions.component';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'products-list',
  standalone: true,
  imports: [
    DynamicTableComponent,
    DecimalPipe,
    ProductActionsComponent,
    RouterLink,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {
  @Input() productList: IProduct[] = [];

  constructor( ) {}
  ngOnInit(): void {

  }

}
