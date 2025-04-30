import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeadComponent } from "../head/head.component";
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  imports: [FooterComponent, HeadComponent, HeaderComponent,CommonModule,FormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  
  private auth =inject(AuthService);

  
  
  userdata: string = JSON.stringify(JSON.parse(localStorage.getItem('User data') || '[]'));
  token: string = JSON.stringify(JSON.parse(localStorage.getItem('token') || '[]'));
  router=inject(Router);

 login() {
  
      if (this.email == "" || this.password == "") { 
        alert("Enter login email and pasword");
        return;
      }else{
        
             this.auth.login(this.email,this.password);
             

         this.email='';
         this.password='';
         
      }
    

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
