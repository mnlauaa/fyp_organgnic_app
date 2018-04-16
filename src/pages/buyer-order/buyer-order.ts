import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'

@Component({
  selector: 'page-buyer-order',
  templateUrl: 'buyer-order.html',
})
export class BuyerOrderPage {
  title = 'Your Order'
  wish_list_open: any = false;

  wishList: any = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiService
  ) {
    this.api.startQueue([
      this.api.getBuyerOrdwes()
    ]).then(data=>{
      data[0].map((o)=>{
        if(o.status == 1)
          this.wishList.push(o);
      })
      console.log(this.wishList)
    }), err=>{
      console.log(err)
    }
  }


}
