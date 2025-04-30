import { Component } from '@angular/core';
import { HeadComponent } from "../head/head.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-contact-us',
  imports: [HeadComponent, HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {

   today = new Date();
   

  request = {
    name: '',
    email: '',
    subject: '',
    message: '',
    date: this.today.toISOString().split('T')[0],
    
  };

  constructor(private productService: ProductService) {}

 

  async saveRequest() {
    const { name, email, subject, message, date } = this.request;
    const productData = { name, email, subject, message, date };

    try {
      await this.productService.addRequest(productData);
      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Request Successfully Sent!",
        showConfirmButton: false,
        timer: 2000
      });

    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Your Request Is Not Sent!",
        showConfirmButton: false,
        timer: 2000
      });
      
    }
  }
}
