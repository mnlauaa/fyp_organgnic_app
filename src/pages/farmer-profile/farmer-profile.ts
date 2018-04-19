import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../providers/api-service/api-service'

//page
import { SellerPersonaliseProfilePage } from '../seller-personalise-profile/seller-personalise-profile'
import { SellerPersonaliseProductsPage } from '../seller-personalise-products/seller-personalise-products'
import { SellerPersonaliseNewsPage } from '../seller-personalise-news/seller-personalise-news'
import { SellerOperationalSettingPage } from '../seller-operational-setting/seller-operational-setting'
import { SellerStatPage} from '../seller-stat/seller-stat'

@Component({
  selector: 'page-farmer-profile',
  templateUrl: 'farmer-profile.html',
})
export class FarmerProfilePage {
  user_info = {}

  listingMode = false;
  sellerPersonalise = null;
  sellerProducts = null;
  sellerNews = null;
  sellerSetting = null;
  busi_stat = null;

  constructor(
    private api: ApiService,
    private ev: Events,
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.sellerPersonalise = { component: SellerPersonaliseProfilePage};
    this.sellerProducts = { component: SellerPersonaliseProductsPage};
    this.sellerNews = { component: SellerPersonaliseNewsPage};
    this.sellerSetting = { component: SellerOperationalSettingPage};
    this.busi_stat = { component: SellerStatPage};
    
    this.ev.subscribe('farm_info', user_info => {
      this.user_info = user_info
    });

    this.api.startQueue([
      this.api.getMeFarm()
    ]).then(data=>{
      this.user_info = data[0]
      console.log(data[0]);
    }), err=>{

    }
  }

  pushPage(page) {
    this.navCtrl.push(page.component, {user_info: this.user_info});
  }

}
