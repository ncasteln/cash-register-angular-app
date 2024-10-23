import { Routes } from '@angular/router';
import { CashRegisterComponent } from './cash-register/cash-register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReportComponent } from './report/report.component';
import { ProductsComponent } from './products/products.component';
import { HistoryComponent } from './history/history.component';

export const routes: Routes = [
  { path: '', redirectTo: '/cash-register', pathMatch: 'full' },
  { path: 'cash-register', component: CashRegisterComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'report', component: ReportComponent },
  { path: 'history', component: HistoryComponent },
  { path: '**', component: NotFoundComponent }
];
