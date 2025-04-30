import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { HeadComponent } from "../head/head.component";

@Component({
  selector: 'app-product-detail',
  imports: [FooterComponent, HeaderComponent, HeadComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

}
