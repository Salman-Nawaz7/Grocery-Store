import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoadScriptService } from '../load-script.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-feature-product',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './feature-product.component.html',
  styleUrl: './feature-product.component.css'
})
export class FeatureProductComponent implements OnInit, AfterViewInit{
   featureproducts: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private loadScript: LoadScriptService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef to trigger change detection
  ) { }
ngOnInit(): void {
   

    this.loadFeaturedProducts();
  }
  ngAfterViewInit(): void {
    // Trigger change detection after all data is loaded
    this.cdr.detectChanges();
    this.checkAndLoadScript(); // Check if both datasets are loaded
  }
  // ngAfterViewInit(): void {
  // console.log('footer script loaded');
  //   this.loadScript.loadScript();
  //   console.log('footer script loaded');
  // }
async loadFeaturedProducts() {
    this.featureproducts = await this.productService.getFeaturedProducts();
    console.log('this.featureproducts', this.featureproducts);
    this.checkAndLoadScript(); // Check if both datasets are loaded
  }
   checkAndLoadScript() {
    if (this.featureproducts.length > 0 ) {
      // Both datasets are loaded, now load the script
      console.log('this.featureproducts loaded');
      // this.loadScript.loadScript();
      console.log('this.featureproducts loaded');
    }
  }
}
