import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  
  constructor() {
    this.addToCart({
      id: 1,
      name: 'Fall Limited Edition Sneakers',
      price: 125.00,
      quantity: 3,
      image: '/assets/images/image-product-1-thumbnail.jpg'
    });
  }
  
  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }
  
  addToCart(item: CartItem): void {
    const currentItems = this.cartItems.getValue();
    const existingItemIndex = currentItems.findIndex(i => i.id === item.id);
    
    if (existingItemIndex !== -1) {
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex].quantity += item.quantity;
      this.cartItems.next(updatedItems);
    } else {
      this.cartItems.next([...currentItems, item]);
    }
  }
  
  removeFromCart(id: number): void {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.filter(item => item.id !== id);
    this.cartItems.next(updatedItems);
  }
  
  clearCart(): void {
    this.cartItems.next([]);
  }
  
  getCartItemCount(): Observable<number> {
    return new Observable<number>(observer => {
      this.cartItems.subscribe(items => {
        const count = items.reduce((total, item) => total + item.quantity, 0);
        observer.next(count);
      });
    });
  }
  
  getTotalPrice(): Observable<number> {
    return new Observable<number>(observer => {
      this.cartItems.subscribe(items => {
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        observer.next(total);
      });
    });
  }
}
