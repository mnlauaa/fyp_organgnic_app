import { Component } from '@angular/core';
import { NavController, MenuController, NavParams, ToastController  } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'

import * as moment from 'moment';

@Component({
  selector: 'page-single-product',
  templateUrl: 'single-product.html',
})
export class SingleProductPage {
  product: any = {};
  now: Date;
  related_product: any = [];
  buyyer_qty: any;

  //postition
  maxPosition: any;
	currentPosition: any = null;
	maxLeft: boolean = true;
  maxRight: boolean = false;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiService,
    private menu: MenuController,
    private toastCtrl: ToastController
  ) {
    let product_id = navParams.get('id');
    let classification =  navParams.get('classification');
    this.now = new Date();
    this.buyyer_qty = 1;
    this.api.startQueue([
      this.api.getProductById(product_id),
      this.api.getRelatedProduct(classification, product_id)
    ]).then(data =>{
      this.product = data[0];
      this.product.rating = Math.ceil(this.product.rating*2)/2;
      this.product.last_update = moment(this.product.last_update).format("D MMM, YYYY");
      if(this.product.special_expiry )
        this.product.special_expiry = new Date(this.product.special_expiry)

      this.related_product = data[1];
      this.related_product.map(product=>product.rating = Math.ceil(product.rating*2)/2)
      if(this.related_product.length < 3){
        this.maxRight = true
      }
      console.log(this.product);
    }),err =>{
      console.log(err);
    }
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
        duration: 1000,
        position: 'bottom'
      });
      toast.present();
    }, err => {
      console.log(err)
    });

  }

  getPosition(event) {
		this.currentPosition = event.srcElement.scrollLeft;
		this.maxPosition = event.srcElement.scrollWidth - event.srcElement.offsetWidth;
        if(this.currentPosition==0){
            this.maxLeft = true;
        } else if(this.currentPosition==this.maxPosition){
            this.maxRight = true;
        } else{
            this.maxRight = false;
            this.maxLeft = false;
        }
  }
  
  openProductDetail(product_detail){
    console.log("open",product_detail);
    this.navCtrl.push(SingleProductPage, 
      { id: product_detail.id, 
        classification: product_detail.classification });
  }

  getFullStarNumber(num = 1){
    return new Array(Math.floor(num));
  }

  getOutlineStarNumber(num = 1){
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
