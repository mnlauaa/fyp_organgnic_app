import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddNewsPage } from '../add-news/add-news';

@Component({
  selector: 'page-seller-personalise-news',
  templateUrl: 'seller-personalise-news.html',
})
export class SellerPersonaliseNewsPage {
  title = "Your News";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellerPersonaliseNewsPage');
  }

  addnew(){
    this.navCtrl.push(AddNewsPage);
  }
}
