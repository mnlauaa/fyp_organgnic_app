import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'
import { SingleOrderPage } from '../single-order/single-order'

@Component({
  selector: 'page-buyer-order',
  templateUrl: 'buyer-order.html',
})
export class BuyerOrderPage {
  title = 'Your Order'
  
  AllList:any = [];

  wishList: any = [];
  wish_list_open: any = false;

  reconfirmList: any = [];
  reconfirmListOpen: any = false

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiService
  ) {
    // this.update()
  }

  ionViewWillEnter(){
    this.update()
  }

  update(){
    this.wishList = [];
    this.reconfirmList = [];
    this.api.startQueue([
      this.api.getBuyerOrdwes()
    ]).then(data=>{
      data[0].map((o)=>{
        if(o.status == 1)
          this.wishList.push(o);
        if(o.status == 2)
          this.reconfirmList.push(o);
      })
      this.AllList = [
        { name: "ReconfirmList", discretion: 'List', list: this.reconfirmList, control: this.reconfirmListOpen},
        { name: "Wish List", discretion: 'List of items with outstanding payment', list: this.wishList, control: this.wish_list_open},
      ]
      console.log(this.wishList)
    }), err=>{
      console.log(err)
    }
  }

  openSingleOrder(order){
    this.navCtrl.push(SingleOrderPage, { 
      order: order
    });
  }


}
