import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HeadComponent } from '../head/head.component';

import { ProductService } from '../product.service';

@Component({
  selector: 'app-user-order',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    HeadComponent
  ],
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserOrderComponent implements OnInit {
  userId: string = '';
  userOrders: any[] = [];
  isLoading = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('User data') || '{}');
    this.userId = userData?.uid;

    if (this.userId) {
      this.productService.getOrdersByUserId(this.userId).subscribe({
        next: (orders) => {
          this.userOrders = orders;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching orders:', err);
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
  }
}
