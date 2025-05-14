// import { Component } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
// import { HeadComponent } from "../head/head.component";
// import { HeaderComponent } from "../header/header.component";
// import { FooterComponent } from "../footer/footer.component";
// import { ProductService } from '../product.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-contact-us',
//   standalone: true,
//   imports: [HeadComponent, HeaderComponent, FooterComponent, CommonModule, FormsModule],
//   templateUrl: './contact-us.component.html',
//   styleUrl: './contact-us.component.css'
// })
// export class ContactUsComponent {

//   today = new Date();

//   request = {
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//     date: this.today.toISOString().split('T')[0],
//   };

//   constructor(private productService: ProductService, private toastr: ToastrService) {}

//   async saveRequest() {
//     const { name, email, subject, message, date } = this.request;
//     const productData = { name, email, subject, message, date };

//     try {
//       await this.productService.addRequest(productData);
//       this.toastr.success('Your request was successfully sent!', 'Success');
//     } catch (error) {
//       this.toastr.error('Your request could not be sent.', 'Error');
//     }
//   }
// }
import { Component, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HeadComponent } from "../head/head.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  standalone: true,
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

  isSubmitting = false;

  @ViewChild('requestForm') requestForm!: NgForm;

  constructor(private productService: ProductService, private toastr: ToastrService) {}

  async saveRequest() {
    if (this.isSubmitting || this.requestForm.invalid) return;

    this.isSubmitting = true;

    const { name, email, subject, message, date } = this.request;
    const productData = { name, email, subject, message, date };

    try {
      await this.productService.addRequest(productData);
      this.toastr.success('Your request was successfully sent!', 'Success');
      this.requestForm.resetForm({ date: this.today.toISOString().split('T')[0] }); // reset form and preserve today's date
    } catch (error) {
      this.toastr.error('Your request could not be sent.', 'Error');
    } finally {
      this.isSubmitting = false;
    }
  }
}
