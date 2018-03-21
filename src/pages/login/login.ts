
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import {ContactusPage} from '../contactus/contactus';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  SignUpOpenPage() {
      this.navCtrl.push(SignupPage);
  }

  ContactOpenPage() {
    this.navCtrl.push(ContactusPage);
  }

}
