// import { AfterViewInit, Component, HostListener, inject, OnInit, ViewEncapsulation } from '@angular/core';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { AuthService } from '../shared/auth.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ProductService } from '../product.service';
// import { NgZone } from '@angular/core';
// import { LoadScriptService } from '../load-script.service';

// @Component({
//   selector: 'app-header',
//   imports: [CommonModule, FormsModule,RouterModule],
//   templateUrl: './header.component.html',
//   styleUrl: './header.component.css',
//   encapsulation: ViewEncapsulation.None
// })
// export class HeaderComponent implements OnInit , AfterViewInit{
  
//   router = inject(Router);
//   auth = inject(AuthService);
//   userdata: string = JSON.stringify(JSON.parse(localStorage.getItem('User data') || '[]'));
//   token: string = JSON.stringify(JSON.parse(localStorage.getItem('token') || '[]'));
//   changebuttons: string = "loginbutton";


// isDropdownOpen: { [key: string]: boolean } = {
//     account: false,
//     language: false,
//     currency: false
//   };

// toggleDropdown(dropdown: string) {
//     this.isDropdownOpen[dropdown] = !this.isDropdownOpen[dropdown];
    
//     // Close other dropdowns if one is open (optional logic)
//     for (const key in this.isDropdownOpen) {
//       if (key !== dropdown) {
//         this.isDropdownOpen[key] = false;
//       }
//     }
//   }
// //  // Close all dropdowns when clicking outside
// //   @HostListener('document:click', ['$event'])
// //   closeDropdowns(event: MouseEvent) {
// //     const target = event.target as HTMLElement;
// //     const isInsideDropdown = target.closest('.dropdown');
    
// //     if (!isInsideDropdown) {
// //       // Close all dropdowns when clicking outside
// //       for (const key in this.isDropdownOpen) {
// //         this.isDropdownOpen[key] = false;
// //       }
// //     }
// //   }
//   constructor( private route: ActivatedRoute, private productService: ProductService, private loadScript: LoadScriptService) {}
//   allCategories: any[] = [];

// ngAfterViewInit(): void {
//     this.loadScript.loadScript();
//   }

//   home() {
//     this.router.navigate(['/home'])
//   }
//   product() {
//     this.router.navigate(['/product'])
//   }
//   blog() {
//     this.router.navigate(['/blog'])
//   }
//   about() {
//     this.router.navigate(['/about-us'])
//   }
//   contact() {
//     this.router.navigate(['/contact-us'])
//   }

//   // 
  
//  cartItems: any[] = [];
//   userId: string = '';
//   ngOnInit(): void {
//     console.log("token",this.token)
//    if (this.token!='[]'){
//     this.changebuttons= "myaccountbutton";
//    }

// this.productService.getCategories().subscribe((data) => {
//   this.allCategories = data;
//   console.log('Categories loaded:', data);
//   // category filter

// });

// // Get the logged-in user's UID from localStorage (after successful login)
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
//   // 
//   profile() {
//     this.router.navigateByUrl('/profile')
//   }

//   logout() {
//     this.auth.logout();

//   }
// }
import { AfterViewInit, Component, HostListener, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { LoadScriptService } from '../load-script.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, AfterViewInit {

  router = inject(Router);
  auth = inject(AuthService);

  changebuttons: string = 'loginbutton';
  isLoggedIn: boolean = false;

  isDropdownOpen: { [key: string]: boolean } = {
    account: false,
    language: false,
    currency: false
  };

  toggleDropdown(dropdown: string) {
    this.isDropdownOpen[dropdown] = !this.isDropdownOpen[dropdown];
    for (const key in this.isDropdownOpen) {
      if (key !== dropdown) {
        this.isDropdownOpen[key] = false;
      }
    }
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private loadScript: LoadScriptService
  ) {}

  allCategories: any[] = [];
  cartItems: any[] = [];
  userId: string = '';

  ngAfterViewInit(): void {
    this.loadScript.loadScript();
  }
  

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('User data') || '{}');
    this.userId = userData?.uid;

    this.isLoggedIn = !!token && token !== '[]' && !!this.userId;
    this.changebuttons = this.isLoggedIn ? 'myaccountbutton' : 'loginbutton';

    this.productService.getCategories().subscribe((data) => {
      this.allCategories = data;
    });

    if (this.isLoggedIn) {
      this.loadCartItems();
    }
  }

  loadCartItems() {
    this.productService.getCartItems(this.userId).subscribe((items: any) => {
      this.cartItems = items;
    });
  }

  getTotalProductsPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  removeFromCart(productId: string) {
    this.productService.removeFromCart(this.userId, productId).then(() => {
      this.loadCartItems();
    });
  }

  home() {
    this.router.navigate(['/home']);
  }

  product() {
    this.router.navigate(['/product']);
  }

  blog() {
    this.router.navigate(['/blog']);
  }

  about() {
    this.router.navigate(['/about-us']);
  }

  contact() {
    this.router.navigate(['/contact-us']);
  }

  profile() {
    this.router.navigateByUrl('/profile');
  }

  logout() {
    this.auth.logout();
    this.isLoggedIn = false;
    this.changebuttons = 'loginbutton';
    this.cartItems = [];
    this.userId = '';
  }
}
