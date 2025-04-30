import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeadComponent } from "../head/head.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-product-checkout',
  imports: [FooterComponent, HeadComponent, HeaderComponent],
  templateUrl: './product-checkout.component.html',
  styleUrl: './product-checkout.component.css'
})
export class ProductCheckoutComponent {

}
