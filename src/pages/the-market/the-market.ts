import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-the-market',
  templateUrl: 'the-market.html',
})
export class TheMarketPage {
  title = 'The Market';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TheMarketPage');
  }

}
