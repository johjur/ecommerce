import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, CartComponent]
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  isCartOpen: boolean = false;
  isMobileMenuOpen: boolean = false;
  cartItemCount: number = 0;
  activeNavIndex: number = -1;
  
  @ViewChild('mobileNavClose') mobileNavCloseButton!: ElementRef;
  @ViewChild('firstNavLink') firstNavLink!: ElementRef;
  @ViewChild('cartButton') cartButton!: ElementRef;
  @ViewChild('cartDropdown') cartDropdown!: ElementRef;
  
  constructor(private cartService: CartService, private elementRef: ElementRef) {}
  
  ngOnInit(): void {
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
    
    document.addEventListener('click', this.handleDocumentClick.bind(this));
  }
  
  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleDocumentClick.bind(this));
  }
  
  ngAfterViewInit(): void {
    this.setupKeyboardNavigation();
  }
  
  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
    if (this.isCartOpen && this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
    }
    
    if (this.isCartOpen) {
      this.trapFocusInCart();
    } else {
      setTimeout(() => {
        if (this.cartButton) {
          this.cartButton.nativeElement.focus();
        }
      }, 100);
    }
  }
  
  closeCart(): void {
    this.isCartOpen = false;
    setTimeout(() => {
      if (this.cartButton) {
        this.cartButton.nativeElement.focus();
      }
    }, 100);
  }
  
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen && this.isCartOpen) {
      this.isCartOpen = false;
    }
    
    if (this.isMobileMenuOpen) {
      this.trapFocusInMenu();
    }
  }
  
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
  
  setActiveNavItem(index: number): void {
    this.activeNavIndex = index;
  }
  
  @HostListener('document:keydown.escape')
  handleEscapeKey(): void {
    if (this.isCartOpen) {
      this.isCartOpen = false;
    }
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
    }
  }
  
  @HostListener('keydown.arrowright', ['$event'])
  @HostListener('keydown.arrowleft', ['$event'])
  handleArrowKeys(event: KeyboardEvent): void {
    if (!this.isMobileMenuOpen) {
      const navLinks = this.getNavLinks();
      if (navLinks.length === 0) return;
      
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const currentIndex = this.findFocusedLinkIndex(navLinks);
      
      if (currentIndex !== -1) {
        const nextIndex = (currentIndex + direction + navLinks.length) % navLinks.length;
        navLinks[nextIndex].focus();
        event.preventDefault();
      }
    }
  }
  
  handleDocumentClick(event: MouseEvent): void {
    if (this.isCartOpen) {
      const cartElement = this.elementRef.nativeElement.querySelector('.cart-dropdown');
      const cartButton = this.cartButton?.nativeElement;
      
      if (cartElement && !cartElement.contains(event.target) && 
          cartButton && !cartButton.contains(event.target)) {
        this.closeCart();
      }
    }
  }
  
  private trapFocusInMenu(): void {
    setTimeout(() => {
      const menuElement = document.getElementById('main-navigation');
      if (menuElement) {
        const focusableElements = this.getFocusableElements(menuElement);
        if (focusableElements.length > 0) {
          if (this.mobileNavCloseButton) {
            this.mobileNavCloseButton.nativeElement.focus();
          } else {
            (focusableElements[0] as HTMLElement).focus();
          }
          
          this.setupFocusTrap(menuElement, focusableElements);
        }
      }
    }, 100);
  }
  
  private trapFocusInCart(): void {
    setTimeout(() => {
      const cartElement = document.getElementById('shopping-cart');
      if (cartElement) {
        const focusableElements = this.getFocusableElements(cartElement);
        if (focusableElements.length > 0) {
          (focusableElements[0] as HTMLElement).focus();
          
          this.setupFocusTrap(cartElement, focusableElements);
        }
      }
    }, 100);
  }
  
  private setupFocusTrap(container: HTMLElement, focusableElements: NodeListOf<Element>): void {
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    container.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }
  
  private getFocusableElements(element: HTMLElement): NodeListOf<Element> {
    return element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
  }
  
  private setupKeyboardNavigation(): void {
    const navLinks = this.getNavLinks();
    navLinks.forEach((link, index) => {
      link.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          link.click();
        }
      });
    });
  }
  
  private getNavLinks(): HTMLElement[] {
    return Array.from(
      this.elementRef.nativeElement.querySelectorAll('.header__nav-link')
    );
  }
  
  private findFocusedLinkIndex(links: HTMLElement[]): number {
    return links.findIndex(link => link === document.activeElement);
  }
}
