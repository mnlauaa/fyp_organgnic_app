import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
@Component({
  selector: 'page-partners',
  templateUrl: 'partners.html',
})
export class PartnersPage {
  title = 'Our Partners'
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnersPage');
  }

}
