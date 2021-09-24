import{NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './app/auth/login/login.component';
import { SignupComponent } from './app/auth/signup/signup.component';
import { HomeComponent } from './app/home/home.component';
import { LogoutComponent } from './app/logout/logout.component';
import { OrdersComponent } from './app/orders/orders.component';
import { PaymentComponent } from './app/payment/payment.component';
import { ProductsComponent } from './app/products/products.component';
import { ShoppingCartComponent } from './app/shopping-cart/shopping-cart.component';
import { SingleProductComponent } from './app/single-product/single-product.component';
import { UserProfileComponent } from './app/user-profile/user-profile.component';



const rute: Routes = [
  {path: '', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'singup', component:SignupComponent},
  {path:'logout', component:LogoutComponent},
  {path:'products', component:ProductsComponent},
  {path: 'details/:id', component:SingleProductComponent},
  {path: 'cart', component:ShoppingCartComponent},
  {path: 'orders', component:OrdersComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'profile', component:UserProfileComponent},
  {path: '**', redirectTo: '/'}
  

    
   

  
];

@NgModule({
    imports:[
        RouterModule.forRoot(rute)
    ],
    exports:[
        RouterModule
    ]
})
export class RoutingModule{}