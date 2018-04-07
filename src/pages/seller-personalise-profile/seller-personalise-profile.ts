import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-seller-personalise-profile',
  templateUrl: 'seller-personalise-profile.html',
})
export class SellerPersonaliseProfilePage {
  title = "Personalise Profile";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellerPersonaliseProfilePage');
  }

}
