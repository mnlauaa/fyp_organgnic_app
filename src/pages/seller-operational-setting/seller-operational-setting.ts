import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-seller-operational-setting',
  templateUrl: 'seller-operational-setting.html',
})
export class SellerOperationalSettingPage {
  title = "Operational Setting";
  settingInfo: any;
  shipping_edit = false;
  shipping_edit_info = {shipping_cost: null, shipping_margin: null};

  delivery_edit = false;
  delivery_edit_info = {};
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
      let user_info = navParams.get('user_info');
      this.settingInfo = {
        coupon: user_info.coupon,
        margin_active: user_info.margin_active,
        shipping_cost: user_info.shipping_cost,
        shipping_margin: user_info.shipping_margin,
        home_cost: user_info.home_cost
      }
      console.log(user_info);
  }
  
  onSubmitShipping(){
    this.settingInfo.shipping_cost = this.shipping_edit_info.shipping_cost;
    this.settingInfo.shipping_margin = this.shipping_edit_info.shipping_margin;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellerOperationalSettingPage');
  }

}
