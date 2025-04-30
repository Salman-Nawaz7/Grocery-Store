import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeadComponent } from "../head/head.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-product-cart',
  imports: [FooterComponent, HeadComponent, HeaderComponent],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.css'
})
export class ProductCartComponent {

}
