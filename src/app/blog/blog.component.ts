import { Component } from '@angular/core';
import { HeadComponent } from "../head/head.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-blog',
  imports: [HeadComponent, HeaderComponent, FooterComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

}
