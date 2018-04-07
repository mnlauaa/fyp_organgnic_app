import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-seller-personalise-products',
  templateUrl: 'seller-personalise-products.html',
})
export class SellerPersonaliseProductsPage {
  title = "Your Products";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellerPersonaliseProductsPage');
  }

}
