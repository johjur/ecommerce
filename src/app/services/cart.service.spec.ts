import { TestBed } from '@angular/core/testing';
import { CartService, CartItem } from './cart.service';
import { skip } from 'rxjs/operators';

describe('CartService', () => {
  let service: CartService;
  let mockCartItem: CartItem;
  let mockCartItems: CartItem[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService]
    });
    service = TestBed.inject(CartService);

    service.clearCart();
    
    mockCartItem = {
      id: 2,
      name: 'Test Sneakers',
      price: 100.00,
      quantity: 1,
      image: '/assets/images/test-image.jpg'
    };

    mockCartItems = [
      {
        id: 3,
        name: 'Blue Sneakers',
        price: 150.00,
        quantity: 2,
        image: '/assets/images/blue-sneakers.jpg'
      },
      {
        id: 4,
        name: 'Red Sneakers',
        price: 120.00,
        quantity: 1,
        image: '/assets/images/red-sneakers.jpg'
      }
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new item to an empty cart', (done) => {
    service.clearCart();
    service.addToCart(mockCartItem);
    
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(1);
      done();
    });
  });

  it('should increase quantity when adding an existing item', (done) => {
    service.addToCart(mockCartItem);
    service.addToCart({...mockCartItem, quantity: 2});
    
    service.getCartItems().subscribe(items => {
      expect(items[0].quantity).toBe(3);
      done();
    });
  });

  it('should add a new item to a cart with existing items', (done) => {
    service.addToCart(mockCartItems[0]);
    service.addToCart(mockCartItems[1]);
    
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(2);
      done();
    });
  });

  it('should remove an item from the cart', (done) => {
    service.addToCart(mockCartItem);
    service.removeFromCart(mockCartItem.id);
    
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(0);
      done();
    });
  });

  it('should clear all items from the cart', (done) => {
    service.addToCart(mockCartItems[0]);
    service.addToCart(mockCartItems[1]);
    service.clearCart();
    
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(0);
      done();
    });
  });

  it('should calculate the correct cart item count', (done) => {
    service.addToCart(mockCartItems[0]);
    service.addToCart(mockCartItems[1]);
    
    service.getCartItemCount().subscribe(count => {
      expect(count).toBe(3);
      done();
    });
  });

  it('should calculate the correct total price', (done) => {
    service.addToCart(mockCartItems[0]);
    service.addToCart(mockCartItems[1]);
    
    service.getTotalPrice().subscribe(total => {
      expect(total).toBe(420);
      done();
    });
  });

  it('should return an empty array when cart is cleared', (done) => {
    service.addToCart(mockCartItem);
    service.clearCart();
    
    service.getCartItems().subscribe(items => {
      expect(items).toEqual([]);
      done();
    });
  });

  it('should emit updated cart items when an item is added', (done) => {
    service.clearCart();
    
    service.getCartItems().pipe(skip(1)).subscribe(items => {
      expect(items[0].id).toBe(mockCartItem.id);
      done();
    });
    
    service.addToCart(mockCartItem);
  });

  it('should emit updated cart items when an item is removed', (done) => {
    service.clearCart();
    
    service.addToCart(mockCartItems[0]);
    service.addToCart(mockCartItems[1]);
    
    const subscription = service.getCartItems().subscribe(items => {
      if (items.length === 1) {
        expect(items[0].id).toBe(mockCartItems[1].id);
        subscription.unsubscribe();
        done();
      }
    });
    
    service.removeFromCart(mockCartItems[0].id);
  });

  it('should return zero for cart count when cart is empty', (done) => {
    service.clearCart();
    
    service.getCartItemCount().subscribe(count => {
      expect(count).toBe(0);
      done();
    });
  });

  it('should return zero for total price when cart is empty', (done) => {
    service.clearCart();
    
    service.getTotalPrice().subscribe(total => {
      expect(total).toBe(0);
      done();
    });
  });
});
