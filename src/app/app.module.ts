import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

// Custom dependencies
import { MyApp } from './app.component';
import { ApiService } from '../providers/api-service/api-service';

// components
import { MyNavbar } from '../components/my-navbar/my-navbar';
import { FilterBox } from '../components/filter-box/filter-box'
import { SortingBox } from '../components/sorting-box/sorting-box'
import { ImageCropper } from '../components/image-cropper/image-cropper'


// Pages
import { HomePage } from '../pages/home/home';
import { TheMarketPage } from '../pages/the-market/the-market';
import { ShoppingCartPage } from '../pages/shopping-cart/shopping-cart';
import { ProfilePage } from '../pages/profile/profile';
import { BuyerOrderPage } from '../pages/buyer-order/buyer-order';
import { MessagePage } from '../pages/message/message';
import { AboutUsPage } from '../pages/about-us/about-us';
import { PartnersPage } from '../pages/partners/partners';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ContactusPage } from '../pages/contactus/contactus';
import { ListingPage } from '../pages/listing/listing';
import { TransactionHistoryPage } from '../pages/transaction-history/transaction-history';
import { CheckOutPage } from '../pages/check-out/check-out';
import { ConfirmOrderPage } from '../pages/confirm-order/confirm-order';
import { SingleProductPage } from '../pages/single-product/single-product'
import { BuyerPersonaliseProfilePage } from '../pages/buyer-personalise-profile/buyer-personalise-profile'
import { FavouriteFarmPage } from '../pages/favourite-farm/favourite-farm'
import { FarmerProfilePage } from '../pages/farmer-profile/farmer-profile'
import { SellerPersonaliseProfilePage } from '../pages/seller-personalise-profile/seller-personalise-profile'
import { SellerPersonaliseProductsPage } from '../pages/seller-personalise-products/seller-personalise-products'
import { SellerPersonaliseNewsPage } from '../pages/seller-personalise-news/seller-personalise-news'
import { SellerOperationalSettingPage } from '../pages/seller-operational-setting/seller-operational-setting'
import { AddNewsPage } from '../pages/add-news/add-news';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';


export const myComponets = [
	// pages
  HomePage,
  TheMarketPage,
  ShoppingCartPage,
  BuyerOrderPage,
  MessagePage,
  AboutUsPage,
  PartnersPage,
  LoginPage,
  SignupPage,
  ContactusPage,
  ListingPage,
  TransactionHistoryPage,
  CheckOutPage,
  ConfirmOrderPage,
  SingleProductPage,
  ProfilePage,
  BuyerPersonaliseProfilePage,
  SellerPersonaliseProfilePage,
  SellerPersonaliseProductsPage,
  SellerPersonaliseNewsPage,
  SellerOperationalSettingPage,
  FavouriteFarmPage,
  FarmerProfilePage,
  AddNewsPage,
  
	// components
  MyNavbar,
  FilterBox,
  SortingBox,
  ImageCropper
];

export const myProviders = [
  ApiService,
];

export const myImports = [
  HttpClientModule,
  IonicStorageModule.forRoot()
];


@NgModule({
  declarations: [
    MyApp,
    ...myComponets
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ...myImports
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ...myComponets
  ],
  providers: [
    ...myProviders,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera
  ]
})
export class AppModule {}
