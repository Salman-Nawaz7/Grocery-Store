import { AfterViewInit, Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HeadComponent } from "../head/head.component";
import { FooterComponent } from "../footer/footer.component";
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoadScriptService } from '../load-script.service';
declare var yourJqueryFunction: any;

@Component({
  selector: 'app-home',
  imports: [RouterModule, HeaderComponent, HeadComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  AboutUs: any[] = [];
  categoryName: string = "";
  products: any[] = [];
  allProducts: any[] = [];
  featureproducts: any[] = [];
  TopProducts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private loadScript: LoadScriptService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef to trigger change detection
  ) { }

  ngOnInit(): void {
    this.productService.getAboutUs().subscribe((data) => {
      this.AboutUs = data;
      console.log('AboutUs loaded:', data);
    });

    this.productService.getTopOrderedProducts(5).then(products => {
      console.log('Top ordered products:', products);
      this.TopProducts = products;
      this.checkAndLoadScript(); // Check if both datasets are loaded
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
      if (this.categoryName == "") {
        this.products = this.allProducts;
      }
    });

    this.loadFeaturedProducts();
  }

  ngAfterViewInit(): void {
    // Trigger change detection after all data is loaded
    this.cdr.detectChanges();
    this.checkAndLoadScript(); // Check if both datasets are loaded
  }

  category(name: string) {
    this.categoryName = name;
    console.log(this.categoryName);
  }

  async loadFeaturedProducts() {
    this.featureproducts = await this.productService.getFeaturedProducts();
    console.log('this.featureproducts', this.featureproducts);
    this.checkAndLoadScript(); // Check if both datasets are loaded
  }

  // Check if both featureproducts and TopProducts are loaded before loading the script
  checkAndLoadScript() {
    if (this.featureproducts.length > 0 && this.TopProducts.length > 0) {
      // Both datasets are loaded, now load the script
      console.log('this.featureproducts loaded');
      this.loadScript.loadScript();
    }
  }
}
