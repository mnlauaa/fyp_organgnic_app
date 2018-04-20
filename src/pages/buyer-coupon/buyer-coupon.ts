import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'

@Component({
  selector: 'page-buyer-coupon',
  templateUrl: 'buyer-coupon.html',
})
export class BuyerCouponPage {
  title = "Shipping Coupon"
  couponList: any
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiService,
  ) {
    this.api.startQueue([
      this.api.getAllCoupon()
    ]).then(data=>{
      console.log(data[0])
      this.couponList = data[0]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyerCouponPage');
  }

}
