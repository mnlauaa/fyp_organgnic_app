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
  enable_back = false;

  AllList:any = [];
  wish_list_open: any = false;
  reconfirmListOpen: any = true
  confirmedListOpen: any = false

  OutstandingList: any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiService
  ) {
    let enable_back= this.navParams.get('enable_back')
    if(enable_back)
      this.enable_back = enable_back;
      this.AllList = [
        { name: "Amendede Orders List", discretion: 'List of orders that have been amendede by seller', list: [], control: this.reconfirmListOpen},
        { name: "Wish List", discretion: 'List of items with outstanding payment', list: [], control: this.wish_list_open},
        { name: "Confirmed Orders", discretion: 'List of confirmed items with or without outstanding payment', list: [], control: this.confirmedListOpen}
      ]
  }

  getOrderId(id){
    let str = "" + id
    let pad = "00000"
    let text_id = pad.substring(0, pad.length - str.length) + str
    return text_id;
  }
  
  ionViewWillEnter(){
    this.update()
  }

  update(){
    this.AllList[0].list = [];
    this.AllList[1].list = [];
    this.AllList[2].list = [];
    this.OutstandingList = [];


    this.api.startQueue([
      this.api.getBuyerOrdwes()
    ]).then(data=>{
      data[0].map((o)=>{
        if(o.status == 1)
          this.AllList[1].list.push(o);
        if(o.status == 2)
          this.AllList[0].list.push(o);
        if(o.status == 3 || o.status == 4)
          this.AllList[2].list.push(o);
        if(o.status == 5)
          this.OutstandingList.push(o);
      })
      // AllList[0].list = 
      console.log(data[0])
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
