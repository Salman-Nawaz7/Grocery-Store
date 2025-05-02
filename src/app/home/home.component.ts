import { AfterViewInit, Component, inject, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HeadComponent } from "../head/head.component";
import { FooterComponent } from "../footer/footer.component";
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
declare var yourJqueryFunction: any;
@Component({
  selector: 'app-home',
  imports: [RouterModule, HeaderComponent, HeadComponent, FooterComponent , CommonModule, FormsModule],
 
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  AboutUs: any[] = [];
  categoryName: string="";
  products: any[] = [];
  allProducts: any[] = [];
  constructor( private route: ActivatedRoute, private productService: ProductService) {}

 
  

  
  

  ngOnInit(): void {

    this.productService.getAboutUs().subscribe((data) => {
      this.AboutUs = data;
      console.log('AboutUs loaded:', data);
    });

    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      if (category) {
        this.category(category); // your filter function
      }
    });

    this.productService.getProducts().subscribe((data) => {
      this.allProducts = data;
      console.log('Products loaded:', data);
      // category filter
      this.products = this.allProducts.filter(p => p.category === this.categoryName);
      console.log('Products loaded2:', this.products);
      if(this.categoryName==""){
        this.products=this.allProducts;
      }
    });
  }

  category(name: string) {
    this.categoryName = name;
    console.log(this.categoryName);
  }
}
