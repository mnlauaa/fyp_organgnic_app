import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ActionSheetController } from 'ionic-angular';
import { FilterBox } from '../../components/filter-box/filter-box'
import { SortingBox } from '../../components/sorting-box/sorting-box'
import { SingleProductPage } from '../single-product/single-product'
import { ApiService } from '../../providers/api-service/api-service'

@Component({
  selector: 'page-seller-personalise-products',
  templateUrl: 'seller-personalise-products.html',
})
export class SellerPersonaliseProductsPage {
  title = "Your Products";
  
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
    public actionSheetCtrl: ActionSheetController
  ) {
    this.user_info = navParams.get('user_info');
    this.filter_list = { 
      favourite: false,
      selection: [navParams.get('user_info').farm_id],
      price_below: null,
      price_above: null
    }
    this.getProductList();
  }

  presentActionSheet(p) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            console.log('Edit clicked');
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


  //update product list
  getProductList(){
    this.api.startQueue([
      this.api.getProducts(this.sorting_id, this.keyword, this.filter_list)
    ]).then(data => {
      this.productList = data[0].product_list;
      this.result_num = data[0].result_num;
      this.productList.map(product=>product.rating = Math.ceil(product.rating*2)/2)
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
