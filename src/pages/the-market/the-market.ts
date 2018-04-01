import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { FilterBox } from '../../components/filter-box/filter-box'
import { SortingBox } from '../../components/sorting-box/sorting-box'
import { SingleProductPage } from '../single-product/single-product'

@Component({
  selector: 'page-the-market',
  templateUrl: 'the-market.html',
})
export class TheMarketPage {
  title = 'The Market';
  sorting_id: any = 0;
  filter_box_show : boolean = false;
  sorting_box_show: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public popoverCtrl: PopoverController
  ) {

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad TheMarketPage');
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
        console.log(this.sorting_id);
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



}
