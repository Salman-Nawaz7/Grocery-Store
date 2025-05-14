// import { Component, OnInit } from '@angular/core';
// import { FooterComponent } from "../footer/footer.component";
// import { HeadComponent } from "../head/head.component";
// import { HeaderComponent } from "../header/header.component";
// import { Observable } from 'rxjs';
// import { ProductService } from '../product.service';
// import { AuthService } from '../shared/auth.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-product-cart',
//   imports: [FooterComponent, HeadComponent, HeaderComponent,CommonModule,FormsModule,RouterModule],
//   templateUrl: './product-cart.component.html',
//   styleUrl: './product-cart.component.css'
// })
// export class ProductCartComponent implements OnInit {
//   cartItems: any[] = [];
//   userId: string = '';

//   constructor(private authService: AuthService, private productService: ProductService) {}

//   ngOnInit(): void {
//     // Get the logged-in user's UID from localStorage (after successful login)
//     const userData = JSON.parse(localStorage.getItem('User data') || '{}');
//     this.userId = userData?.uid;

//     if (this.userId) {
//       this.loadCartItems();
//     }
//   }

//   loadCartItems() {
//     this.productService.getCartItems(this.userId).subscribe((items: any) => {
//       this.cartItems = items;
//     });
//   }

//   getTotalProductsPrice(): number {
//     return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   }

//   // Remove an item from the cart
//   removeFromCart(productId: string) {
//     this.productService.removeFromCart(this.userId, productId).then(() => {
//       this.loadCartItems(); // Reload the cart items after removal
//     });
//   }

//   // Clear the entire cart
//   clearCart() {
//     // Implement your clear cart logic
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeadComponent } from "../head/head.component";
import { HeaderComponent } from "../header/header.component";
import { Observable } from 'rxjs';
import { ProductService } from '../product.service';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [
    FooterComponent,
    HeadComponent,
    HeaderComponent,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
  cartItems: any[] = [];
  userId: string = '';

  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('User data') || '{}');
    this.userId = userData?.uid;

    if (this.userId) {
      this.loadCartItems();
    }
  }

  loadCartItems(): void {
    this.productService.getCartItems(this.userId).subscribe((items: any[]) => {
      this.cartItems = items;
    });
  }

  getTotalProductsPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  removeFromCart(productId: string): void {
    if (confirm('Are you sure you want to remove this item from the cart?')) {
      this.productService.removeFromCart(this.userId, productId).then(() => {
        this.loadCartItems();
      }).catch(err => console.error('Failed to remove item:', err));
    }
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your entire cart?')) {
      this.productService.clearCart(this.userId).subscribe({
        complete: () => {
          console.log('Cart cleared successfully.');
          this.loadCartItems();
        },
        error: (err) => {
          console.error('Error clearing cart:', err);
        }
      });
    }
  }
}
