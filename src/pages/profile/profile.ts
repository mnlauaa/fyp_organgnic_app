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
  personal_info = null;
  role = null

  personaliseProfile = BuyerPersonaliseProfilePage;
  tranHistory = TransactionHistoryPage;
  favouriteFarmPage = FavouriteFarmPage

  constructor(
    private ev: Events,
    private storage: Storage,
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.ev.subscribe('user_info', (identity, display_name, profile_pic_url) => {
      this.display_name = display_name;
      this.profile_pic_url = profile_pic_url;
    });

    this.storage.get('user_info').then((user_info)=>{
      console.log(user_info)
      if(user_info){
        this.personal_info = user_info;
        this.profile_pic_url = user_info.profile_pic_url;
        this.display_name = user_info.display_name;
        if(user_info.identity == 0)
          this.role = "Buyer"
        else  
          this.role = "Farmer"
			}
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  pushPage(page) {
    this.navCtrl.push(page);
  }

}
