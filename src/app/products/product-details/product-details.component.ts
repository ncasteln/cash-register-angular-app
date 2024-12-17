import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IProduct } from '../../models';
import { ProductActionsComponent } from '../product-actions/product-actions.component';

@Component({
  selector: 'product-details',
  standalone: true,
  imports: [
    ProductActionsComponent
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct = {
    name: 'Broccoli',
    price: 90,
    img: 'assets/broccoli.jpg',
    alt: 'broccoloni',
    disabled: false,
    external: false

  }
  name: string = '';

  constructor( private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.name = params['name']
    })
  }
}
