import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-seller-operational-setting',
  templateUrl: 'seller-operational-setting.html',
})
export class SellerOperationalSettingPage {
  title = "Operational Setting";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellerOperationalSettingPage');
  }

}
