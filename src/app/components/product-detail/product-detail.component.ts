import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightboxComponent } from '../lightbox/lightbox.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, LightboxComponent]
})
export class ProductDetailComponent {
  quantity: number = 0;
  currentImageIndex: number = 0;
  isLightboxOpen: boolean = false;
  
  productImages = [
    {
      main: '/assets/images/image-product-1.jpg',
      thumbnail: '/assets/images/image-product-1-thumbnail.jpg'
    },
    {
      main: '/assets/images/image-product-2.jpg',
      thumbnail: '/assets/images/image-product-2-thumbnail.jpg'
    },
    {
      main: '/assets/images/image-product-3.jpg',
      thumbnail: '/assets/images/image-product-3-thumbnail.jpg'
    },
    {
      main: '/assets/images/image-product-4.jpg',
      thumbnail: '/assets/images/image-product-4-thumbnail.jpg'
    }
  ];

  constructor(private cartService: CartService) {}

  decreaseQuantity(): void {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  changeImage(index: number): void {
    this.currentImageIndex = index;
  }

  prevImage(event: Event): void {
    event.stopPropagation();
    this.currentImageIndex = (this.currentImageIndex - 1 + this.productImages.length) % this.productImages.length;
  }

  nextImage(event: Event): void {
    event.stopPropagation();
    this.currentImageIndex = (this.currentImageIndex + 1) % this.productImages.length;
  }

  openLightbox(): void {
    if (window.innerWidth > 768) {
      this.isLightboxOpen = true;
    }
  }

  closeLightbox(): void {
    this.isLightboxOpen = false;
  }

  addToCart(): void {
    if (this.quantity > 0) {
      this.cartService.addToCart({
        id: 1,
        name: 'Fall Limited Edition Sneakers',
        price: 125.00,
        quantity: this.quantity,
        image: '/assets/images/image-product-1-thumbnail.jpg'
      });
      
      this.quantity = 0;
    }
  }
}
