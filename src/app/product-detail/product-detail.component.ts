import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { HeadComponent } from "../head/head.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import 'owl.carousel';
import { ToastrService } from 'ngx-toastr';
// import $ from 'jquery';
declare var $: any;  // Declare jQuery to avoid type errors



@Component({
  selector: 'app-product-detail',
  imports: [FooterComponent, HeaderComponent, HeadComponent,CommonModule,FormsModule,RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(private route: ActivatedRoute, private productService: ProductService,private toastr: ToastrService) {}
  selectedImage: string | null = null;

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(async params => {
      const id = params['id'];
      if (id) {
        this.product = await this.productService.getProductById(id);
        // Wait for Angular to render images before initializing carousel
        if (this.product?.images?.length > 0) {
          this.selectedImage = this.product.images[0];
        }
        setTimeout(() => this.initCarousel(), 0);
      }
    });
  }

  initCarousel() {
    setTimeout(() => {
      $('.owl-carousel').owlCarousel({
        items: 4,
        loop: true,
        margin: 10,
        nav: true
      });
    }, 0);
  }
    
addToCart(product: any) {
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
    // Save product to localStorage temporarily
    localStorage.setItem('pendingCartProduct', JSON.stringify({ product, quantity }));
    
    // Redirect to login and include returnUrl
    this.toastr.info('Please login to continue.', 'Login Required');
    window.location.href = `/user-login?returnUrl=product-cart`;  // Or use router.navigate if you prefer
  }
}




  // ngAfterViewInit() {
  //   // Ensure jQuery is used to initialize Owl Carousel
  //   $(document).ready(function () {
  //     $('.owl-carousel').owlCarousel({
  //       items: 3, // Number of items to show
  //       loop: true,
  //       margin: 10,
  //       autoplay: true,
  //       autoplayTimeout: 2000,
  //     });
  //   });
  // }
}
