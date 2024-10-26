import { Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReportComponent } from './report/report.component';
import { ProductsComponent } from './products/products.component';
import { HistoryComponent } from './history/history.component';

export const routes: Routes = [
  { path: '', redirectTo: '/order', pathMatch: 'full' },
  { path: 'order', component: OrderComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'report', component: ReportComponent },
  { path: 'history', component: HistoryComponent },
  { path: '**', component: NotFoundComponent }
];
