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
      thumbnail: '/assets/images/image-product-1-thumbnail.jpg',
      altText: 'Right leg sneaker from side view and left leg sneaker on tip facing the bottom of shoe. White leather with light brown accents, white shoelaces, and minimalistic style.'
    },
    {
      main: '/assets/images/image-product-2.jpg',
      thumbnail: '/assets/images/image-product-2-thumbnail.jpg',
      altText: 'Shoes with two stones and a branch artistically placed, one shoe on top of two rocks. White leather with light brown toe and bottom sides, white shoelaces, minimalistic style.'
    },
    {
      main: '/assets/images/image-product-3.jpg',
      thumbnail: '/assets/images/image-product-3-thumbnail.jpg',
      altText: 'Right leg shoe on top of two rocks with orange background between rocks. White leather upper with light brown toe area, white shoelaces, minimalistic style.'
    },
    {
      main: '/assets/images/image-product-4.jpg',
      thumbnail: '/assets/images/image-product-4-thumbnail.jpg',
      altText: 'Left leg shoe from side profile with heel balanced on top of two rocks positioned horizontally. White sole, white shoelaces, light brown toe and bottom sides, white leather upper with orange heel part, minimalistic style.'
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
