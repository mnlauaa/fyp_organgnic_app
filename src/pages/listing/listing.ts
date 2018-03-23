import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// @IonicPage()
@Component({
  selector: 'page-listing',
  templateUrl: 'listing.html',
})
export class ListingPage {
  title = 'Listing';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListingPage');
  }

}
