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

  newReceive: any = [];
  newListOpen: any = true;

  confirmList: any = [];
  confirmListOpen: any = false

  shippingList: any = [];
  shippingListOpen: any = false

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
    this.confirmList = [];
    this.api.startQueue([
      this.api.getSellerOrdwes()
    ]).then(data=>{
      console.log(data)
      data[0].map((o)=>{
        if(o.status == 1)
          this.newReceive.push(o);
        if(o.status == 3)
          this.confirmList.push(o);
        if(o.status == 4)
          this.shippingList.push(o);
        this.AllList = [
          { name: "Orders Waiting for Confirmation", discretion: 'List of items with outstanding payment', list: this.newReceive, control: this.newListOpen},
          { name: "Comfirmed List", discretion: 'List of order which already confirmed', list: this.confirmList, control: this.confirmListOpen},
          { name: "Shipping List", discretion: 'List of order which already shipping', list: this.shippingList, control: this.shippingListOpen},
        ]
      })
      console.log(this.newReceive)
      console.log(this.confirmList)
    }), err=>{
      console.log(err)
    }
  }

}
