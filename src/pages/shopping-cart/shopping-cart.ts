import { HttpParams } from '@angular/common/http';
import { Component, ViewChild  } from '@angular/core';
import { NavController, NavParams, Slides, MenuController, AlertController  } from 'ionic-angular';
import { TheMarketPage } from '../the-market/the-market';
import { CheckOutPage } from '../check-out/check-out';
import { ApiService } from '../../providers/api-service/api-service'

@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {
  @ViewChild(Slides) slides: Slides;
  title = 'Shopping Cart';
  now: Date;
  user_info: any;
  enable_back = false;
  allOrder = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    protected api: ApiService,
    private menu: MenuController,
    private alertCtrl: AlertController
  ) {
    this.now = new Date();
    this.user_info = navParams.get('user_info');
    this.enable_back = navParams.get('enable_back') || false;
    this.update()
  }

  update(){
    this.api.startQueue([
      this.api.getShopingCart()
    ]).then(data => {
      console.log("shop", data[0])
      this.allOrder = data[0];
      if(this.allOrder[0])
        this.calculateSubTotal();
      this.allOrder.map((o)=>{
        if(o.farm.pickup.length != 0)
          o.farm.pickup_way = "point"
        else
          o.farm.pickup_way = "home"
        o.farm.shipping = 0;
        this.calculateShipping(o)

        o.productList.map((p)=>{
          if(p.special_expiry)
            p.special_expiry = new Date(p.special_expiry)
        });
        this.calculateSubTotal();
      })
    }, err => {
      console.log(err)
    });
  }



  deleteTransition(id){
    this.api.startQueue([
      this.api.deleteTransition(id)
    ]).then(data => {
      this.update()
    }, err => {
      console.log(err)
    });
  }

  productBuyerQtyEdit(o, p, button){
    if(button){
      if(p.qty < p.products_left){
        p.qty++ 
        const data = new HttpParams().set('qty', p.qty)
        this.api.startQueue([
          this.api.putTransition(data, p.transaction_id)
        ]).then((date)=>{
          console.log(date)
        }), err=>{
          console.log(err)
        }
      }
    } else {
      if(p.qty > 1)
        p.qty--
        const data = new HttpParams().set('qty', p.qty)
        this.api.startQueue([
          this.api.putTransition(data, p.transaction_id)
        ]).then((date)=>{
          console.log(date)
        }), err=>{
          console.log(err)
        }
    }
    this.calculateSubTotal();
    this.calculateShipping(o);
  }

  calculateShipping(o){
    if(o.farm){
      o.farm.shipping = 0
      if( !o.farm.margin_on || (o.farm.margin_on && o.farm.shipping_margin > o.sum) ){
        o.farm.shipping += o.farm.shipping_cost
      }
      if( o.farm.home_on && o.farm.pickup_way == "home")
        o.farm.shipping +=  o.farm.home_additional_cost
    }
  }

  calculateSubTotal(){
    this.allOrder.map((order)=>{
      let sum = 0;
      order.productList.map((p)=>{
        if(p.special_expiry > this.now)
          sum += p.special_price * p.qty
        else
          sum += p.price * p.qty
      })
      order.sum = sum;
    })
    return true;
  }

  presentConfirm(id) {
    let alert = this.alertCtrl.create({
      title: 'Remove Product',
      message: 'Do you want to remove this product?',
      buttons: [
        {
          text: 'Remove',
          handler: () => { this.deleteTransition(id) }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    alert.present();
  }




  // 

  hiddenCheck(button){
    if(button){
      return this.slides.isBeginning();
    } else {
      return this.slides.isEnd();
    }
  }

  slideButtonClick(button){
    if(button)
      return this.slides.slidePrev();
    else 
      return this.slides.slideNext();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingCartPage');
  }

  MarketOpenPage() {
    this.navCtrl.push(TheMarketPage);
  }

  checkOutOpenPage(order, list_num){
    this.navCtrl.push(CheckOutPage, {
      order: order,
      list_num: list_num + 1
    });
  }

  ionViewDidEnter() {
    if(this.enable_back)
      this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    if(this.enable_back)
      this.menu.swipeEnable(true);
  } 
}
