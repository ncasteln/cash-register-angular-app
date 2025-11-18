import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReportComponent } from './report/report.component';
import { ProductsComponent } from './products/products.component';
import { HistoryComponent } from './history/history.component';
import { CashRegisterComponent } from './cash-register/cash-register.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { SigninComponent } from './login/signin.component';
import { SignupComponent } from './signup/signup.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: '/cash-register', pathMatch: 'full' },
  {
    path: 'cash-register',
    title: 'Cash register',
    canActivate: [ authGuard ],
    component: CashRegisterComponent },
  {
    path: 'products',
    title: 'Products',
    canActivate: [ authGuard ],
    component: ProductsComponent
  },
  {
    path: 'product-details/:_id',
    title: 'Product details',
    canActivate: [ authGuard ],
    component: ProductDetailsComponent
  },
  {
    path: 'create-product',
    title: 'Create product',
    canActivate: [ authGuard ],
    component: ProductDetailsComponent
  },
  {
    path: 'signin',
    title: 'Signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    title: 'Signup',
    component: SignupComponent
  },
  { path: 'history',
    title: 'History',
    canActivate: [ authGuard ],
    component: HistoryComponent },
  { path: '**',
    component: NotFoundComponent
  }
];
