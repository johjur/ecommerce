import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductDetailComponent } from '../../components/product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  standalone: true,
  imports: [HeaderComponent, ProductDetailComponent]
})
export class ProductComponent {

}
