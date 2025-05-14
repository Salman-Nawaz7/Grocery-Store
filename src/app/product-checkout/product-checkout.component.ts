// import { Component, OnInit } from '@angular/core';
// import { FooterComponent } from "../footer/footer.component";
// import { HeadComponent } from "../head/head.component";
// import { HeaderComponent } from "../header/header.component";
// import { Router } from '@angular/router';
// import { ProductService } from '../product.service';
// import { AuthService } from '../shared/auth.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { lastValueFrom } from 'rxjs';
// import { ToastrService } from 'ngx-toastr'; // Import ToastrService

// @Component({
//   selector: 'app-product-checkout',
//   imports: [FooterComponent, HeadComponent, HeaderComponent, CommonModule, FormsModule],
//   templateUrl: './product-checkout.component.html',
//   styleUrls: ['./product-checkout.component.css']
// })
// export class ProductCheckoutComponent implements OnInit {
//   cartItems: any[] = [];
//   userId: string = '';
//   shippingAddress: string = '';
//   isSubmitting: boolean = false; // Flag to prevent multiple submissions

//   constructor(
//     private authService: AuthService, 
//     private productService: ProductService, 
//     private router: Router, 
//     private toastr: ToastrService // Inject ToastrService
//   ) {}

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

//   async placeOrder(event: Event) {
//     event.preventDefault();

//     // Prevent submitting if already processing
//     if (this.isSubmitting) return;

//     // Set the submitting flag to true
//     this.isSubmitting = true;

//     // Validate address
//     if (!this.shippingAddress) {
//       this.toastr.error('Shipping address is required!', 'Error');
//       this.isSubmitting = false;
//       return;
//     }

//     // Prepare the order data
//     const orderData = {
//       userId: this.userId,
//       products: this.cartItems,
//       totalPrice: this.getTotalProductsPrice() + 10, // Including shipping
//       shippingAddress: this.shippingAddress,
//       status: 'Pending',
//       createdAt: new Date(),
//     };

//     try {
//       // Save the order to Firestore
//       await this.productService.addOrder(orderData);
//       this.toastr.success('Order successfully placed!', 'Success');
      
//       // Clear the cart after the order is placed
//       await this.productService.clearCart(this.userId);
//       this.toastr.info('Cart cleared.', 'Info');

//       this.isSubmitting = false;
//       this.router.navigateByUrl('/product-cart');
//     } catch (error: unknown) {
//       this.toastr.error('Error placing order: ' + (error instanceof Error ? error.message : 'An unknown error occurred'), 'Error');
//     } finally {
//       // Reset the submitting flag after processing
//       this.isSubmitting = false;
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeadComponent } from "../head/head.component";
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-checkout',
  standalone: true,
  imports: [FooterComponent, HeadComponent, HeaderComponent, CommonModule, FormsModule],
  templateUrl: './product-checkout.component.html',
  styleUrls: ['./product-checkout.component.css']
})
export class ProductCheckoutComponent implements OnInit {
  cartItems: any[] = [];
  userId: string = '';
  shippingAddress: string = '';
  isSubmitting: boolean = false;

reason: string = '';

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
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

  // async placeOrder(event: Event): Promise<void> {
  //   event.preventDefault();

  //   if (this.isSubmitting) return;
  //   this.isSubmitting = true;

  //   if (!this.shippingAddress.trim()) {
  //     this.toastr.error('Shipping address is required!', 'Error');
  //     this.isSubmitting = false;
  //     return;
  //   }

  //   if (!this.userId || this.cartItems.length === 0) {
  //     this.toastr.error('Cart is empty or user not found.', 'Error');
  //     this.isSubmitting = false;
  //     return;
  //   }


  //   const orderData = {
  //     userId: this.userId,
  //     products: this.cartItems,
  //     totalPrice: this.getTotalProductsPrice() + 10,
  //     shippingAddress: this.shippingAddress,
  //     status: 'Pending',
  //     reason: 'N/a',
  //     createdAt: new Date()
  //   };

  //   try {
  //     await this.productService.addOrder(orderData);
  //     await this.toastr.success('Order successfully placed!', 'Success');
  //   this.router.navigateByUrl('/user-order');
  //     // Convert Observable to Promise for await
  //     await lastValueFrom(this.productService.clearCart(this.userId));
      
  //     this.router.navigateByUrl('/user-order');
  //   } catch (error: unknown) {
  //     // this.toastr.error(
  //     //   'Error placing order: ' + (error instanceof Error ? error.message : 'Unknown error'),
  //     //   'Error'
  //     // );
  //   } finally {
  //     this.isSubmitting = false;
  //   }
  // }

  async placeOrder(event: Event): Promise<void> {
  event.preventDefault();

  if (this.isSubmitting) return;
  this.isSubmitting = true;

  if (!this.shippingAddress.trim()) {
    this.toastr.error('Shipping address is required!', 'Error');
    this.isSubmitting = false;
    return;
  }

  if (!this.userId || this.cartItems.length === 0) {
    this.toastr.error('Cart is empty or user not found.', 'Error');
    this.isSubmitting = false;
    return;
  }

  const orderData = {
    userId: this.userId,
    products: this.cartItems,
    totalPrice: this.getTotalProductsPrice() + 10,
    shippingAddress: this.shippingAddress,
    status: 'Pending',
    reason: 'N/a',
    createdAt: new Date()
  };

  try {
    // Update stocks before placing the order
    await this.productService.updateStockForOrder(this.cartItems);

    // Save the order
    await this.productService.addOrder(orderData);

    this.toastr.success('Order successfully placed!', 'Success');

    // Clear cart
    await lastValueFrom(this.productService.clearCart(this.userId));

    this.toastr.info('Cart cleared.', 'Info');
    this.router.navigateByUrl('/user-order');
  } catch (error: unknown) {
    this.toastr.error(
      'Error placing order: ' + (error instanceof Error ? error.message : 'Unknown error'),
      'Error'
    );
  } finally {
    this.isSubmitting = false;
  }
}

}
