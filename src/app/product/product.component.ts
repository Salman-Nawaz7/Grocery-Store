import {  AfterViewInit, Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HeadComponent } from "../head/head.component";
import { FooterComponent } from "../footer/footer.component";
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadScriptService } from '../load-script.service';


@Component({
  selector: 'app-product',
  imports: [HeaderComponent, HeadComponent, FooterComponent, CommonModule,RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, AfterViewInit{
  categoryName: string="";
  products: any[] = [];
  allProducts: any[] = [];
  constructor(private route: ActivatedRoute, private productService: ProductService,private toastr: ToastrService, private loadScript: LoadScriptService) {}
  ngAfterViewInit(): void {
    // this.loadScript.loadScript();
  }

  ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    const category = params['category'];
    if (category) {
      this.category(category); // Sets categoryName
    }

    // Fetch and filter products AFTER categoryName is set
    this.productService.getProducts().subscribe((data) => {
      this.allProducts = data;

      this.products = this.allProducts.filter(product => {
        const inCategory = this.categoryName ? product.category === this.categoryName : true;
        const isActive = product.status?.toLowerCase() === 'active';
        const inStock = product.stock > 0;
        return inCategory && isActive && inStock;
      });

      console.log('Filtered Products:', this.products);
    });
  });
}


// ngOnInit(): void {
//   this.route.queryParams.subscribe(params => {
//     const category = params['category'];
//     if (category) {
//       this.category(category);
//     }
//   });
//   // ngAfterViewInit(): void {
//   //   // this.loadScript.loadScript();
//   // }
//   this.productService.getProducts().subscribe((data) => {
//     this.allProducts = data;

//     // ✅ Filter by correct field names: stock and status
//     this.products = this.allProducts.filter(product => {
//       const inCategory = this.categoryName ? product.category === this.categoryName : true;
//       const isActive = product.status?.toLowerCase() === 'active';
//       const inStock = product.stock > 0;  // ✅ Corrected here
//       return inCategory && isActive && inStock;
//     });

//     console.log('Filtered Products:', this.products);
//   });
// }
addToCart(product: any) {
  console.log('Product sent to addToCart:', this.products);
  const userData = JSON.parse(localStorage.getItem('User data') || '{}');
  const qtyInput = document.querySelector<HTMLInputElement>('input[name="qty"]');
  const quantity = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;

  if (userData?.uid) {
    this.productService.addToCart(userData.uid, product, quantity).then(() => {
      this.toastr.success('Product added to cart!', 'Success');
    }).catch(error => {
      console.error('Error adding to cart:', error);
      this.toastr.error('Error adding to cart', 'Error');
    });
  } else {
    this.toastr.warning('Please log in to add to cart.', 'Not Logged In');
  }
}


  // ngOnInit(): void {
  //   this.route.queryParams.subscribe(params => {
  //     const category = params['category'];
  //     if (category) {
  //       this.category(category); // your filter function
  //     }
  //   });

  //   this.productService.getProducts().subscribe((data) => {
  //     this.allProducts = data;
  //     console.log('Products loaded:', data);
  //     // category filter
  //     this.products = this.allProducts.filter(p => p.category === this.categoryName);
  //     console.log('Products loaded2:', this.products);
  //     if(this.categoryName==""){
  //       this.products=this.allProducts;
  //     }
  //   });
  // }

  category(name: string) {
    this.categoryName = name;
    console.log(this.categoryName);
  }

  
}
