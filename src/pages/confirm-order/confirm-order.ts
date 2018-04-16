import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
@Component({
  selector: 'page-confirm-order',
  templateUrl: 'confirm-order.html',
})
export class ConfirmOrderPage {
  title = 'Confirmed Order';
  order: any;
  payment_way: any;
  deposite_way: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.order = navParams.get('order');
    this.payment_way = navParams.get('payment_way');
    this.deposite_way = navParams.get('deposite_way')
    console.log(this.order)
    console.log(this.payment_way)
    console.log(this.deposite_way)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmOrderPage');
  }

}
