import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { ProductComponent } from './product/product.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductCheckoutComponent } from './product-checkout/product-checkout.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { Page404Component } from './page-404/page-404.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { UserOrderComponent } from './user-order/user-order.component';
import { FeatureProductComponent } from './feature-product/feature-product.component';


export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'product',component:ProductComponent},
    {path:'product-cart',component:ProductCartComponent},
    {path:'product-detail',component:ProductDetailComponent},
    {path:'product-checkout',component:ProductCheckoutComponent},
    {path:'blog',component:BlogComponent},
    {path:'blog-detail',component:BlogDetailComponent},
    {path:'user-login',component:UserLoginComponent},
    {path:'user-register',component:UserRegisterComponent},
    {path:'contact-us',component:ContactUsComponent},
    {path:'about-us',component:AboutUsComponent},
    {path:'page-404',component:Page404Component},
    {path:'forgotpassword',component:ForgotpasswordComponent},
    {path:'myaccount',component:MyaccountComponent},
    {path:'user-order',component:UserOrderComponent},
    {path:'feature-product',component:FeatureProductComponent}
    
];
