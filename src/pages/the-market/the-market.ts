import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { FilterBox } from '../../components/filter-box/filter-box'
import { SortingBox } from '../../components/sorting-box/sorting-box'
import { SingleProductPage } from '../single-product/single-product'
import { ApiService } from '../../providers/api-service/api-service'

@Component({
  selector: 'page-the-market',
  templateUrl: 'the-market.html',
})
export class TheMarketPage {
  title = 'The Market';
  
  productList: any;
  result_num:any = 0;
  
  //for filter
  filter_box_show : boolean = false;
  filter_list: any;

  search_bar: String;
  keyword: any;
  

  //for sorting
  sorting_box_show: boolean = false;
  sorting_id: any = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public api: ApiService
  ) {
    this.keyword = navParams.get('keyword');
    this.filter_list = navParams.get('filter_list') || { favourite: false,
                                                         selection: [],
                                                         price_below: null,
                                                         price_above: null}
    this.getProductList();
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

  //open filter box
  openFilterBox(myEvent) {
    let popover = this.popoverCtrl.create(FilterBox, {
        parent: this,
        callback: ()=>{
          this.getProductList();
        },
        filterBoxWillClose : ()=>{
          this.filter_box_show = false;
        }
      }, {cssClass: 'filter-box'});

    popover.present({
      ev: myEvent
    });

    setTimeout(()=>{
      this.filter_box_show = true;
    }, 100);
  }

  //open Sorting box
  openSortingBox(myEvent) {
    let popover = this.popoverCtrl.create(SortingBox, {
      parent: this,
      callback: (sorting_id) => {
        this.sorting_id = sorting_id;
        this.getProductList();
      },
      sortingBoxWillClose : ()=>{
        this.sorting_box_show = false;
      }
    }, {cssClass: 'sorting-box'});

    popover.present({
      ev: myEvent
    });

    setTimeout(()=>{
      this.sorting_box_show = true;
    }, 100);
  }

  openProductDetail(product_detail){
    console.log(product_detail);
    this.navCtrl.push(SingleProductPage, {product_detail: product_detail});
  }
  
  getFullStarNumber(num){
    return new Array(Math.floor(num));
  }

  getOutlineStarNumber(num){
    return new Array(Math.floor(5-num));
  }


}
