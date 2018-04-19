import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'
import * as moment from 'moment';
@Component({
  selector: 'page-transaction-history',
  templateUrl: 'transaction-history.html',
})
export class TransactionHistoryPage {
  title = "Transaction History";
  order: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiService,
  ) {
    this.api.startQueue([
      this.api.getMyOrder()
    ]).then(data=>{
      this.order = data[0]
      this.order.map(o=>{
        o.date = moment(o.date).calendar(null, {
          lastDay: '[Yesterday]',
          lastWeek: 'HH:mm',
          sameDay: 'HH:mm',
          sameElse: 'DD MMM, YYYY'
        })
      });
      console.log(data[0])
    }),err=>{
      console.log(err)
    }
  }
}
