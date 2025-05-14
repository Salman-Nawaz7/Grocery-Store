import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeadComponent } from "../head/head.component";
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-user-login',
  imports: [FooterComponent, HeadComponent, HeaderComponent,CommonModule,FormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  loginError: string = "";
  private auth =inject(AuthService);
constructor( private productService: ProductService) {}
  
  
  userdata: string = JSON.stringify(JSON.parse(localStorage.getItem('User data') || '[]'));
  token: string = JSON.stringify(JSON.parse(localStorage.getItem('token') || '[]'));
  router=inject(Router);


login() {
  if (this.email == "" || this.password == "") { 
    alert("Enter login email and password");
    return;
  }

  this.auth.login(this.email, this.password).then(() => {
    const userData = JSON.parse(localStorage.getItem('User data') || '{}');
    const pending = JSON.parse(localStorage.getItem('pendingCartProduct') || 'null');

    if (pending && userData?.uid) {
      this.productService.addToCart(userData.uid, pending.product, pending.quantity).then(() => {
        localStorage.removeItem('pendingCartProduct'); // Clear after use
        this.router.navigate(['/product-cart']);
      });
    } else {
      // Navigate to returnUrl if set
      const returnUrl = this.router.parseUrl(this.router.url).queryParams['returnUrl'] || '/home';
      this.router.navigate([returnUrl]);
    }
  }).catch(error => {
    this.loginError = 'Login failed. Please try again.';
    console.error(error);
  });
}



        googlesignin(){
      this.auth.googlesign();
        }


  ngOnInit(): void {
    if(this.userdata==null||this.token=="true"){
      this.router.navigate(['/home']);
    }

  }
}
