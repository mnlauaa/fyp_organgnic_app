import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service';
@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {
  title = 'About Us'
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiService
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUsPage');
  }

}
