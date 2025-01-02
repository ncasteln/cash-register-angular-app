import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReportComponent } from './report/report.component';
import { ProductsComponent } from './products/products.component';
import { HistoryComponent } from './history/history.component';
import { HarvestComponent } from './harvest/harvest.component';
import { CashRegisterComponent } from './cash-register/cash-register.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { CreateProductComponent } from './products/create-product/create-product.component';

export const routes: Routes = [
  { path: '', redirectTo: '/cash-register', pathMatch: 'full' },
  { path: 'cash-register', component: CashRegisterComponent },
  { path: 'harvest', component: HarvestComponent },
  {
    path: 'products',
    title: 'Products',
    component: ProductsComponent
  },
  {
    path: 'product-details/:_id',
    title: 'Product details',
    component: ProductDetailsComponent
  },
  {
    path: 'create-product',
    component: CreateProductComponent
  },
  { path: 'report', component: ReportComponent },
  { path: 'history', component: HistoryComponent },
  { path: '**', component: NotFoundComponent }
];
