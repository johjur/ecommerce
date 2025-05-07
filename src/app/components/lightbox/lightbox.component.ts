import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProductImage {
  main: string;
  thumbnail: string;
  altText?: string;
}

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LightboxComponent implements AfterViewInit, OnChanges {
  @Input() isOpen: boolean = false;
  @Input() images: ProductImage[] = [];
  @Input() currentIndex: number = 0;
  @Output() close = new EventEmitter<void>();
  
  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('mainImage') mainImage!: ElementRef;
  
  private lastFocusedElement: HTMLElement | null = null;
  
  constructor(private elementRef: ElementRef) {}
  
  ngAfterViewInit(): void {
    this.setupKeyboardNavigation();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && changes['isOpen'].currentValue) {
      this.lastFocusedElement = document.activeElement as HTMLElement;
      
      setTimeout(() => {
        this.trapFocus();
      }, 100);
    } else if (changes['isOpen'] && !changes['isOpen'].currentValue) {
      if (this.lastFocusedElement) {
        setTimeout(() => {
          this.lastFocusedElement?.focus();
        }, 100);
      }
    }
    
    if (changes['currentIndex'] && this.isOpen && this.mainImage?.nativeElement) {
      setTimeout(() => {
        this.mainImage.nativeElement.focus();
      }, 50);
    }
  }
  
  closeModal(): void {
    this.close.emit();
  }
  
  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
  
  previousImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
  
  selectImage(index: number): void {
    this.currentIndex = index;
  }
  
  @HostListener('keydown.escape')
  handleEscapeKey(): void {
    this.closeModal();
  }
  
  @HostListener('keydown.arrowright')
  handleRightArrow(): void {
    this.nextImage();
  }
  
  @HostListener('keydown.arrowleft')
  handleLeftArrow(): void {
    this.previousImage();
  }
  
  private trapFocus(): void {
    const lightboxElement = this.elementRef.nativeElement.querySelector('.lightbox');
    if (!lightboxElement) return;
    
    const focusableElements = this.getFocusableElements(lightboxElement);
    if (focusableElements.length === 0) return;
    
    setTimeout(() => {
      if (this.mainImage && this.mainImage.nativeElement) {
        this.mainImage.nativeElement.focus();
      } else {
        (focusableElements[0] as HTMLElement).focus();
      }
    }, 100);
    
    this.setupFocusTrap(lightboxElement, focusableElements);
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
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), img[tabindex="0"]'
    );
  }
  
  private setupKeyboardNavigation(): void {
    setTimeout(() => {
      const thumbnails = this.getThumbnailElements();
      thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener('keydown', (event: Event) => {
          const e = event as KeyboardEvent;
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = Array.from(thumbnails).indexOf(thumbnail as Element) + 1;
            if (nextIndex < thumbnails.length) {
              (thumbnails[nextIndex] as HTMLElement).focus();
            }
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevIndex = Array.from(thumbnails).indexOf(thumbnail as Element) - 1;
            if (prevIndex >= 0) {
              (thumbnails[prevIndex] as HTMLElement).focus();
            }
          }
        });
      });
    }, 500);
  }
  
  private getThumbnailElements(): NodeListOf<Element> {
    return this.elementRef.nativeElement.querySelectorAll('.lightbox__thumbnail');
  }
}
