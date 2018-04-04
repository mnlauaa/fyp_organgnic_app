import { Component } from '@angular/core';
import { NavController, MenuController, NavParams, ToastController  } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'

import * as moment from 'moment';

@Component({
  selector: 'page-single-product',
  templateUrl: 'single-product.html',
})
export class SingleProductPage {
  product: any;
  buyyer_qty: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiService,
    private menu: MenuController,
    private toastCtrl: ToastController
  ) {
    this.product = navParams.get('product_detail');
    this.product.last_update = moment(this.product.last_update).format("D MMM, YYYY")
    this.buyyer_qty = 1;

  }

  controlQty(add){
    if(add){
      if(this.buyyer_qty < this.product.qty)
        this.buyyer_qty++;
    } else {
      if(this.buyyer_qty > 1)
        this.buyyer_qty--;
    }
  }

  addToCart(){
    let data = {
      farm_id: this.product.farm_id,
      product_id: this.product.id,
      qty: this.buyyer_qty
    }
    this.api.startQueue([
      this.api.postShopingCart(data)
    ]).then(data => {
      let toast = this.toastCtrl.create({
        message: 'Product added to cart successfully',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    }, err => {
      console.log(err)
    });

    
  }


    
  getFullStarNumber(num){
    return new Array(Math.floor(num));
  }

  getOutlineStarNumber(num){
    return new Array(Math.floor(5-num));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingleProductPage');
  }
  
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  } 
}
