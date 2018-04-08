import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BuyerPersonaliseProfilePage } from '../buyer-personalise-profile/buyer-personalise-profile'
import { TransactionHistoryPage } from '../transaction-history/transaction-history'
import { FavouriteFarmPage } from '../favourite-farm/favourite-farm'

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  title = 'Profile';
  display_name = null;
  profile_pic_url = null;
  user_info = {};
  role = null

  personaliseProfile = BuyerPersonaliseProfilePage;
  tranHistory = TransactionHistoryPage;
  favouriteFarmPage = FavouriteFarmPage;

  constructor(
    private ev: Events,
    private storage: Storage,
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.user_info = navParams.get('user_info');
    if(navParams.get('user_info').identity == 0)
      this.role = "Buyer"
    else  
      this.role = "Farmer"

    this.ev.subscribe('user_info', user_info => {
      this.user_info = user_info
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  pushPage(page) {
    this.navCtrl.push(page, {user_info: this.user_info});
  }

}
