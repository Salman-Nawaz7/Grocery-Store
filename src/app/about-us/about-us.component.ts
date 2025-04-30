import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HeadComponent } from "../head/head.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-about-us',
  imports: [HeaderComponent, HeadComponent, FooterComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

}
