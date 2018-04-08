import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Events, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

// pages
import { HomePage } from '../pages/home/home';
import { TheMarketPage } from '../pages/the-market/the-market';
import { ShoppingCartPage } from '../pages/shopping-cart/shopping-cart';
import { ListingPage } from '../pages/listing/listing';
import { ProfilePage } from '../pages/profile/profile';
import { FarmerProfilePage } from '../pages/farmer-profile/farmer-profile'
import { BuyerOrderPage } from '../pages/buyer-order/buyer-order';
import { MessagePage } from '../pages/message/message';
import { AboutUsPage } from '../pages/about-us/about-us';
import { PartnersPage } from '../pages/partners/partners';
import { LoginPage } from '../pages/login/login';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
	upper_page: any;
	bottom_pages: any;
	login: any;
	guest: boolean = true;
	user_info = {};

  constructor(
		private ev: Events,
		private storage: Storage,
		protected menu: MenuController,
		protected platform: Platform, 
		protected statusBar: StatusBar, 
		protected splashScreen: SplashScreen
  ) {
		let buyer_pages = [
			{ title: 'Home', component: HomePage, icon: 'fa fa-home fa-fw fa-lg'},
			{ title: 'The Market', component: TheMarketPage, icon: 'fa fa-shopping-bag fa-fw fa-lg'},
			{ title: 'Shopping Cart', component: ShoppingCartPage, icon: 'fa fa-shopping-cart fa-fw fa-lg'},
			{ title: 'Profile', component: ProfilePage, icon: 'fa fa-user fa-fw fa-lg'},
			{ title: 'Your Orders', component: BuyerOrderPage, icon: 'fa fa-clipboard fa-fw fa-lg'},
			{ title: 'Message', component: MessagePage, icon: 'fa fa-comments fa-fw fa-lg'}
		]

		let seller_pages = [
			{ title: 'Home', component: HomePage, icon: 'fa fa-home fa-fw fa-lg'},
			{ title: 'Listing', component: ListingPage, icon: 'fa fa-list-ul fa-fw fa-lg'},
			{ title: 'Profile', component: FarmerProfilePage, icon: 'fa fa-user fa-fw fa-lg'},
			{ title: 'Orders Received', component: BuyerOrderPage, icon: 'fa fa-clipboard fa-fw fa-lg'},
			{ title: 'Message', component: MessagePage, icon: 'fa fa-comments fa-fw fa-lg'}
		]

		let user_bottom_pages = [
			{ title: 'Setting', component: HomePage, icon: 'fa fa-cog fa-fw fa-lg'},
			{ title: 'About Us', component: AboutUsPage, icon: 'fa fa-info-circle fa-fw fa-lg'},
			{ title: 'Our Partners', component: PartnersPage, icon: 'fa fa-handshake-o fa-fw fa-lg'},
		]

		let guset_pages = [
			{ title: 'Home', component: HomePage, icon: 'fa fa-home fa-fw fa-lg'},
			{ title: 'The Market', component: TheMarketPage, icon: 'fa fa-shopping-bag fa-fw fa-lg'},
			{ title: 'About Us', component: AboutUsPage, icon: 'fa fa-info-circle fa-fw fa-lg'},
			{ title: 'Our Partners', component: PartnersPage, icon: 'fa fa-handshake-o fa-fw fa-lg'},
		]
		
		this.ev.subscribe('user_info', (user_info) => {
			this.user_info = user_info;
			switch(Number(user_info.identity)){
				case 0:
					this.guest = false;
					this.upper_page = buyer_pages;
					this.bottom_pages = user_bottom_pages;
					break;

				case 1:
					this.guest = false;
					this.upper_page = seller_pages;
					this.bottom_pages = user_bottom_pages;
					break;
				
				default:
					this.guest = true;
					this.upper_page = null
					this.bottom_pages = guset_pages;	
					break;
			}
		});
		
		this.storage.get('user_info').then((user_info)=>{
			//push info to ionic event
			if(user_info)
				this.ev.publish('user_info', user_info);	
			//set deafult event
			else{
				let guest_info = {
					identity: -1,
					display_name: 'Visitor',
					profile_pic_url: null,
					address: null,
					phone_number: null,
				}
				this.ev.publish('user_info', guest_info);
			}
		})

		//login button test
		this.login = { title: 'Login', component: LoginPage, icon: 'fa fa-shopping-cart fa-fw fa-lg'}
	}

  	openPage(page) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page.component, {user_info: this.user_info});
		this.menu.close();
	}

	pushPage(page) {
		this.nav.push(page.component);
		this.menu.close();
	}
	

}


