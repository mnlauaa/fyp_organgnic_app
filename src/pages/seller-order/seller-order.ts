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
  AllList:any = [];

  newListOpen: any = true;
  confirmListOpen: any = false
  shippingListOpen: any = false
  nonPaymentListOpen: any = false

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private api: ApiService
  ) {
    this.AllList = [
      { name: "Orders Waiting for Confirmation", discretion: 'List of items with outstanding payment', list: [], control: this.newListOpen},
      { name: "Comfirmed List", discretion: 'List of orders which have already confirmed', list: [], control: this.confirmListOpen},
      { name: "Shipping List", discretion: 'List of orders which are being shipped', list: [], control: this.shippingListOpen},
      { name: "Debtor List", discretion: 'List of orders which have not yet paid', list: [], control: this.nonPaymentListOpen}
    ]
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
    this.AllList[0].list = [];
    this.AllList[1].list = [];
    this.AllList[2].list = [];
    this.AllList[3].list = [];

    this.api.startQueue([
      this.api.getSellerOrdwes()
    ]).then(data=>{
      console.log(data)
      data[0].map((o)=>{
        if(o.status == 1)
          this.AllList[0].list.push(o);
        if(o.status == 3)
          this.AllList[1].list.push(o);
        if(o.status == 4)
          this.AllList[2].list.push(o);
        if(o.status == 5)
          this.AllList[3].list.push(o);
      })
    }), err=>{
      console.log(err)
    }
  }

}
