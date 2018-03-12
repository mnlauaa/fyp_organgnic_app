import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
@Component({
  selector: 'page-buyer-order',
  templateUrl: 'buyer-order.html',
})
export class BuyerOrderPage {
  title = 'Your Order'
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyerOrderPage');
  }

}
