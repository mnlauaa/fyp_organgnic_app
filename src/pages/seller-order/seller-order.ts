import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'
import { SingleSellerOrderPage } from '../single-seller-order/single-seller-order'

@Component({
  selector: 'page-seller-order',
  templateUrl: 'seller-order.html',
})
export class SellerOrderPage {
  title = 'Orders Received'
  newReceive: any = []

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private api: ApiService
  ) {
  }

  openSingleOrder(order){
    this.navCtrl.push(SingleSellerOrderPage, { 
      order: order
    });
  }

  ionViewWillEnter(){
    this.update()
  }

  update(){
    this.newReceive = [];
    this.api.startQueue([
      this.api.getSellerOrdwes()
    ]).then(data=>{
      console.log(data)
      data[0].map((o)=>{
        if(o.status == 1)
          this.newReceive.push(o);
      })
      console.log(this.newReceive)
    }), err=>{
      console.log(err)
    }
  }

}
