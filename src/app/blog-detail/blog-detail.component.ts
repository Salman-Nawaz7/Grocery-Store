import { Component } from '@angular/core';
import { HeadComponent } from "../head/head.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-blog-detail',
  imports: [HeadComponent, HeaderComponent],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent {

}
