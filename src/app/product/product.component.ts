import {  Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HeadComponent } from "../head/head.component";
import { FooterComponent } from "../footer/footer.component";
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [HeaderComponent, HeadComponent, FooterComponent, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  categoryName: string="";
  products: any[] = [];
  allProducts: any[] = [];
  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
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
