import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// pages
import { HomePage } from '../pages/home/home';
import { TheMarketPage } from '../pages/the-market/the-market';
import { ShoppingCartPage } from '../pages/shopping-cart/shopping-cart';
import { ProfilePage } from '../pages/profile/profile';
import { BuyerOrderPage } from '../pages/buyer-order/buyer-order';
import { MessagePage } from '../pages/message/message';
import { AboutUsPage } from '../pages/about-us/about-us';
import { PartnersPage } from '../pages/partners/partners';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
	buyer_pages: any;
	user_bottom_pages: any;

  constructor(
		protected menu: MenuController,
		protected platform: Platform, 
		protected statusBar: StatusBar, 
		protected splashScreen: SplashScreen
  ) {
	platform.ready().then(() => {
	  statusBar.show();
	});
	this.initializeApp();

	this.buyer_pages = [
		{ title: 'Home', component: HomePage, icon: 'fa fa-home fa-fw fa-lg'},
		{ title: 'The Market', component: TheMarketPage, icon: 'fa fa-shopping-bag fa-fw fa-lg'},
		{ title: 'Shopping Cart', component: ShoppingCartPage, icon: 'fa fa-shopping-cart fa-fw fa-lg'},
		{ title: 'Profile', component: ProfilePage, icon: 'fa fa-user fa-fw fa-lg'},
		{ title: 'Your Orders', component: BuyerOrderPage, icon: 'fa fa-clipboard fa-fw fa-lg'},
		{ title: 'Message', component: MessagePage, icon: 'fa fa-comments fa-fw fa-lg'}
	]

	this.user_bottom_pages = [
		{ title: 'Setting', component: HomePage, icon: 'fa fa-cog fa-fw fa-lg'},
		{ title: 'About Us', component: AboutUsPage, icon: 'fa fa-info-circle fa-fw fa-lg'},
		{ title: 'Our Partners', component: PartnersPage, icon: 'fa fa-shopping-cart fa-fw fa-lg'},
	]

  }

  initializeApp() {
	this.platform.ready().then(() => {
	  // Okay, so the platform is ready and our plugins are available.
	  // Here you can do any higher level native things you might need.
	  this.statusBar.overlaysWebView(false);
	  this.statusBar.backgroundColorByHexString('#00a69c');
	  this.splashScreen.hide();
	});
  }

  openPage(page) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page.component);
		this.menu.close();
  }
}
