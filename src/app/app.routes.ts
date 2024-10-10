import { Routes } from '@angular/router';
import { CashRegisterComponent } from './cash-register/cash-register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditComponent } from './edit/edit.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  { path: '', redirectTo: '/cash-register', pathMatch: 'full' },
  { path: 'cash-register', component: CashRegisterComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'edit', component: EditComponent },
  { path: '**', component: NotFoundComponent }
];
