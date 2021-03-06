import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ActionSheetController, ModalController } from 'ionic-angular';
import { SingleProductPage } from '../single-product/single-product'
import { ApiService } from '../../providers/api-service/api-service'

import { ProductChange } from '../../components/product-change/product-change'

@Component({
  selector: 'page-seller-personalise-products',
  templateUrl: 'seller-personalise-products.html',
})
export class SellerPersonaliseProductsPage {
  title = "Your Products";
  now: Date;
  
  user_info: any;
  productList: any;
  result_num:any = 0;

  filter_list: any;

  search_bar: String;
  keyword: any;

  sorting_id: any = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public api: ApiService,
    public actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
  ) {
    this.user_info = navParams.get('user_info');
    this.filter_list = { 
      favourite: false,
      selection: [navParams.get('user_info').farm_id],
      price_below: null,
      price_above: null
    }
    this.now = new Date();
    this.getProductList();
  }

  presentActionSheet(p) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            this.openProductModal(p)

          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }

  openProductModal(p = null){
    let profileModal = this.modalCtrl.create(ProductChange, { 
      product: p,
    });
    profileModal.onDidDismiss(()=>{
      this.getProductList();
    })
    profileModal.present();
  }


  //update product list
  getProductList(){
    this.api.startQueue([
      this.api.getProducts(this.sorting_id, this.keyword, this.filter_list)
    ]).then(data => {
      this.productList = data[0].product_list;
      this.result_num = data[0].result_num;
      this.productList.map((product) => {
        product.rating = Math.ceil(product.rating*2)/2
        if(product.special_expiry )
          product.special_expiry = new Date(product.special_expiry)
      })
      console.log(this.productList);
    }, err => {
      console.log(err)
    });
  }

  //filter bt keyword
  getProductBykeyword(){
    this.keyword = this.search_bar;
    this.search_bar = null;
    this.getProductList()
  }
  
  getFullStarNumber(num){
    return new Array(Math.floor(num));
  }

  getOutlineStarNumber(num){
    return new Array(Math.floor(5-num));
  }


}
