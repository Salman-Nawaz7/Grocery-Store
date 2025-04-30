import { Component, inject } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { HeadComponent } from "../head/head.component";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-forgotpassword',
  imports: [FooterComponent, HeaderComponent, HeadComponent,FormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  email: string = "";
  
  private auth =inject(AuthService);
  

  forgotpassword() {
       
    this.auth.forgotpassword(this.email);
    
  }
}
