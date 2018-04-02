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
  
  //for filter
  filter_box_show : boolean = false;
  filter_list: any = [];
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
    this.keyword = navParams.get('keyword') || 'What product are you looking for';
    
    this.getProductList(this.sorting_id);
  }

  getProductList(sorting, keyword = null, filter = null){
    this.api.startQueue([
      this.api.getProducts(sorting, keyword, filter)
    ]).then(data => {
      this.productList = data[0];
      this.productList.map(product=>product.rating = Math.ceil(product.rating*2)/2)
      console.log(this.productList);
    }, err => {
      console.log(err)
    });
  }

  //open filter box
  openFilterBox(myEvent) {
    let popover = this.popoverCtrl.create(FilterBox, {
        parent: this,
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
        this.getProductList(sorting_id);
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

  openProductDetail(){
    this.navCtrl.push(SingleProductPage);
  }
  
  getFullStarNumber(num){
    return new Array(Math.floor(num));
  }

  getOutlineStarNumber(num){
    return new Array(Math.floor(5-num));
  }


}
