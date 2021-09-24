import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutingModule } from 'src/routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseService } from './services/firebase.service';
import { LogoutComponent } from './logout/logout.component';
import { SortProductPipe } from './pipes/sort-product.pipe';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CartService } from './services/cart.service';
import { OrdersComponent } from './orders/orders.component';
import { PaymentComponent } from './payment/payment.component';
import { AppPropertiesPipe } from './pipes/app-properties.pipe';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ProductsComponent,
    SingleProductComponent,
    LogoutComponent,
    SortProductPipe,
    ShoppingCartComponent,
    OrdersComponent,
    PaymentComponent,
    AppPropertiesPipe,
    UserProfileComponent,
    FooterComponent,
    NotFoundComponent
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    Ng2OrderModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyD2xq53i8jxW0vj-Qh-Fs39D8refNqMdUI",
      authDomain: "kvaonlineshop.firebaseapp.com",
      projectId: "kvaonlineshop",
      storageBucket: "kvaonlineshop.appspot.com",
      messagingSenderId: "795148591968",
      appId: "1:795148591968:web:01e86e043e4c5cc70c3405"
    }),
    AngularFirestoreModule
    
  
    
  ],
  providers: [FirebaseService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
