import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SellerPersonaliseProfilePage } from '../seller-personalise-profile/seller-personalise-profile'
import { SellerPersonaliseProductsPage } from '../seller-personalise-products/seller-personalise-products'
import { SellerPersonaliseNewsPage } from '../seller-personalise-news/seller-personalise-news'
import { SellerOperationalSettingPage } from '../seller-operational-setting/seller-operational-setting'


@Component({
  selector: 'page-farmer-profile',
  templateUrl: 'farmer-profile.html',
})
export class FarmerProfilePage {
  listingMode = false;
  sellerPersonalise = null;
  sellerProducts = null;
  sellerNews = null;
  sellerSetting = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sellerPersonalise = { component: SellerPersonaliseProfilePage};
    this.sellerProducts = { component: SellerPersonaliseProductsPage};
    this.sellerNews = { component: SellerPersonaliseNewsPage};
    this.sellerSetting = { component: SellerOperationalSettingPage};
  }

  pushPage(page) {
    this.navCtrl.push(page.component);
  }

}
