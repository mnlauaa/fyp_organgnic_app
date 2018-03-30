import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TransactionHistoryPage } from '../transaction-history/transaction-history'

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  title = 'Profile';
  TranHistory = TransactionHistoryPage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  pushPage(page) {
    this.navCtrl.push(page);
  }

}
