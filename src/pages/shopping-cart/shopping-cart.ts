import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TheMarketPage } from '../the-market/the-market';
import {CheckOutPage} from '../check-out/check-out';
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {
  title = 'Shopping Cart';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingCartPage');
  }

  MarketOpenPage() {
    this.navCtrl.push(TheMarketPage);
  }

  checkOutOpenPage(){
    this.navCtrl.push(CheckOutPage);
  }
}
