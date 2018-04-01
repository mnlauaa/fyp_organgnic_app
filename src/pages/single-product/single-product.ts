import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
@Component({
  selector: 'page-single-product',
  templateUrl: 'single-product.html',
})
export class SingleProductPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private menu: MenuController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingleProductPage');
  }
  
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  } 
}
