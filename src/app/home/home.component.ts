import {
  AfterViewInit,
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewEncapsulation
} from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HeadComponent } from "../head/head.component";
import { FooterComponent } from "../footer/footer.component";
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoadScriptService } from '../load-script.service';
import { FooterHomeComponent } from "../footer-home/footer-home.component";

declare var yourJqueryFunction: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    HeadComponent,
    CommonModule,
    FormsModule,
    FooterHomeComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit {
  AboutUs: any[] = [];
  categoryName: string = "";
  products: any[] = [];
  allProducts: any[] = [];
  featureproducts: any[] = [];
  TopProducts: any[] = [];
  private scriptsLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private loadScript: LoadScriptService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadAboutUs();
    this.loadTopProducts();
    this.loadAllProducts();
    this.loadFeaturedProducts();

    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      if (category) {
        this.category(category);
        this.filterProducts();
      }
    });
     this.confirmPageLoaded().then(() => {
    console.log('Page fully loaded!');
    // Safe to run your jQuery plugins or scripts here
  });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.checkAndLoadScript();
     if(this.scriptsLoaded==false){
this.loadScript.loadScript();
    }
  }

  private loadAboutUs() {
    this.productService.getAboutUs().subscribe((data) => {
      this.AboutUs = data;
      console.log('AboutUs loaded:', data);
    });
  }

  private async loadTopProducts() {
    this.TopProducts = await this.productService.getTopOrderedProducts(5);
    console.log('Top ordered products:', this.TopProducts);
    this.checkAndLoadScript();
  }

  private loadAllProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.allProducts = data;
      console.log('All products loaded:', data);
      this.filterProducts();
    });
  }

  async loadFeaturedProducts() {
    this.featureproducts = await this.productService.getFeaturedProducts();
    console.log('Featured products:', this.featureproducts);
    this.checkAndLoadScript();
  }

  category(name: string) {
    this.categoryName = name;
    console.log('Category set to:', this.categoryName);
    this.filterProducts();
  }

  private filterProducts() {
    if (this.categoryName) {
      this.products = this.allProducts.filter(p => p.category === this.categoryName);
    } else {
      this.products = this.allProducts;
    }
    console.log('Filtered products:', this.products);
  }

  private checkAndLoadScript() {
    if(this.scriptsLoaded==true || this.scriptsLoaded==false){
if (this.featureproducts.length > 0 && this.TopProducts.length > 0 ) {
      this.scriptsLoaded = true;
      console.log('All required data loaded. Loading script...');
      // Wait for Angular to finish rendering DOM, then run jQuery
      setTimeout(() => {
        console.log('All required data loaded. Initializing Owl Carousel...');
        this.loadScript.loadScript();  // This must initialize .owl-carousel
      }, 1000); // Delay to ensure DOM is rendered
    }
    }
    
  }

  

  confirmPageLoaded(): Promise<void> {
  return new Promise((resolve) => {
    if (document.readyState === 'complete') {
      this.scriptsLoaded=true;
      // Page already loaded
      resolve();
    } else {
      // Wait for load event
      this.scriptsLoaded=false;
      window.addEventListener('load', () => {
        resolve();
      });
    }
  });
}

}
