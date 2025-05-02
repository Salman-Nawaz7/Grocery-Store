import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  
  router = inject(Router);
  auth = inject(AuthService);
  userdata: string = JSON.stringify(JSON.parse(localStorage.getItem('User data') || '[]'));
  token: string = JSON.stringify(JSON.parse(localStorage.getItem('token') || '[]'));
  changebuttons: string = "loginbutton";

  constructor( private route: ActivatedRoute, private productService: ProductService) {}
  allCategories: any[] = [];



  home() {
    this.router.navigate(['/home'])
  }
  
 
  ngOnInit(): void {
    console.log("token",this.token)
   if (this.token!='[]'){
    this.changebuttons= "myaccountbutton";
   }

this.productService.getCategories().subscribe((data) => {
  this.allCategories = data;
  console.log('Categories loaded:', data);
  // category filter

});


  }
  profile() {
    this.router.navigateByUrl('/profile')
  }

  logout() {
    this.auth.logout();

  }
}
