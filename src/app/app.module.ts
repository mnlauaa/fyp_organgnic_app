import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// Custom dependencies
import { MyApp } from './app.component';
import { ApiService } from '../providers/api-service/api-service';

// components
import { MyNavbar } from '../components/my-navbar/my-navbar';

// Pages
import { HomePage } from '../pages/home/home';
import { TheMarketPage } from '../pages/the-market/the-market';
import { ShoppingCartPage } from '../pages/shopping-cart/shopping-cart';
import { ProfilePage } from '../pages/profile/profile';
import { BuyerOrderPage } from '../pages/buyer-order/buyer-order';
import { MessagePage } from '../pages/message/message';
import { AboutUsPage } from '../pages/about-us/about-us';
import { PartnersPage } from '../pages/partners/partners';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export const myComponets = [
	// pages
  HomePage,
  TheMarketPage,
  ShoppingCartPage,
  ProfilePage,
  BuyerOrderPage,
  MessagePage,
  AboutUsPage,
  PartnersPage,

	// components
  MyNavbar
];

export const myProviders = [
	ApiService
];


@NgModule({
  declarations: [
    MyApp,
    ...myComponets
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
  ]
})
export class AppModule {}
