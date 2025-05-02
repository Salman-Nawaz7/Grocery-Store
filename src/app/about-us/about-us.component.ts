import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HeadComponent } from "../head/head.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-about-us',
  imports: [HeaderComponent, HeadComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent implements OnInit {
  AboutUs: any[] = [];
  
  constructor(private AboutUsService: ProductService) {}

  ngOnInit(): void {
    this.AboutUsService.getAboutUs().subscribe((data) => {
      this.AboutUs = data;
      console.log('AboutUs loaded:', data);
    });
  }
}
