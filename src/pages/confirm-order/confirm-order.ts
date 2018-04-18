import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BuyerOrderPage } from '../buyer-order/buyer-order'
import * as moment from 'moment';

@Component({
  selector: 'page-confirm-order',
  templateUrl: 'confirm-order.html',
})
export class ConfirmOrderPage {
  title = 'Confirmed Order';
  order: any;
  order_id: any;
  payment_way: any;
  deposite_way: any;
  time: any;
  date: any;
  location: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.order = navParams.get('order');
    this.payment_way = navParams.get('payment_way');
    this.deposite_way = navParams.get('deposite_way')
    this.location = navParams.get('location')
    let time = navParams.get('time')  


    let str = "" + this.order.productList[0].order_id
    let pad = "00000"
    this.order_id = pad.substring(0, pad.length - str.length) + str
    this.time = moment(this.order.date).format("HH:mm");
    this.date = moment(this.order.date).format("D MMM, YYYY")
    

    console.log(this.date)
    console.log(this.order)
    console.log(this.payment_way)
    console.log(this.deposite_way)
  }

  onFinish(){
    this.navCtrl.setRoot(BuyerOrderPage);
  }

}
