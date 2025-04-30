import { Component, inject } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeadComponent } from "../head/head.component";
import { HeaderComponent } from "../header/header.component";
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  imports: [FooterComponent, HeadComponent, HeaderComponent, CommonModule, FormsModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  email: string = "";
  password: string = "";
  confirm_password: string = "";
  
  private auth =inject(AuthService);
  

 register() {
   
      if (this.email == "" || this.password == "") { 
        alert("Enter login email and pasword");
        return;
      }
      
      if (this.confirm_password != this.password) { 
        alert("Password Not Match");
        return;
      }
      
      else{
        
             this.auth.register(this.email,this.password);
    

         this.email='';
         this.password='';
         this.confirm_password='';
      }
    

  }
}
