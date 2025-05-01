import { Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';

export const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'product', component: ProductComponent }
];
