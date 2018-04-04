import { Component, ViewChild  } from '@angular/core';
import { NavController, NavParams, Slides, MenuController } from 'ionic-angular';
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
  enable_back = false;
  allOrder = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    protected api: ApiService,
    private menu: MenuController,
  ) {
    this.api.startQueue([
      this.api.getShopingCart()
    ]).then(data => {
      console.log("shop", data)
      this.allOrder = data[0];
      if(this.allOrder[0])
        this.calculateTotal();
    }, err => {
      console.log(err)
    });

    this.enable_back = navParams.get('enable_back') || false;
  }

  productBuyerQtyEdit(p, button){
    if(button){
      if(p.qty < p.products_left)
        p.qty++
    } else {
      if(p.qty > 1)
        p.qty--
    }
    this.calculateTotal();
  }

  calculateTotal(){
    this.allOrder.map((order)=>{
      let sum = 0;
      order.map((p)=>{
        sum += p.price * p.qty
      })
      order.sum = sum;
    })
    return true;
  }

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

  checkOutOpenPage(){
    this.navCtrl.push(CheckOutPage);
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
