import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'

/**
 * Generated class for the FilterBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'filter-box',
  templateUrl: 'filter-box.html'
})
export class FilterBox {
  parent: any;
  callback: any;
  brandList: any;
  favouriteList: any

  //local
  favourite: Boolean;
  class: any = [];
  selection: any = [];
  classSelect: any = [];
  price_below: Number = null;
  price_above: Number = null;
  special: any = false;
  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    protected api: ApiService,
  ){
    this.api.startQueue([
      this.api.getFarms(),
      this.api.getMyFavourite()
    ]).then(data => {
      console.log(data);
      this.brandList = data[0]
      this.favouriteList = data[1]
    }, err => {
      if(err.status == 401){
        console.log(401)
      }
    });
    this.parent = navParams.data.parent;
    this.callback = navParams.data.callback;

    this.favourite = this.parent.filter_list.favourite;
    this.selection = this.parent.filter_list.selection;
    this.classSelect = this.parent.filter_list.classSelect;
    this.price_below = this.parent.filter_list.price_below || null;
    this.price_above = this.parent.filter_list.price_above || null;
    this.special = this.parent.filter_list.special || null;


    this.class = [
      { name: "Bulbs", id: 0 },
      { name: "Flowers", id: 1 },
      { name: "Fruits", id: 2 },
      { name: "Fungi", id: 3 },
      { name: "Leaves", id: 4 },
      { name: "Roots", id: 5 },
      { name: "Seeds", id: 6 },
      { name: "Stems", id: 7 },
      { name: "Tubers", id: 8 }
    ]

    viewCtrl.onWillDismiss(()=>{
      navParams.data.filterBoxWillClose();
    })
  }

  toggleSelection(id){
    let idx = this.selection.indexOf(id);
    if(idx >= 0)
      this.selection.splice(idx, 1)
    else
      this.selection.push(id)
  }

  toggleClass(id){
    let idx = this.classSelect.indexOf(id);
    if(idx >= 0)
      this.classSelect.splice(idx, 1)
    else
      this.classSelect.push(id)
  }

  submit(){
    if(this.favourite){
      this.parent.filter_list.favourite = true;
      this.selection = [];
      this.favouriteList.map((item)=>{
        this.selection.push(item.farm_id)
      })
    }
    console.log( this.classSelect);
    this.parent.filter_list.selection = this.selection;
    this.parent.filter_list.classSelect = this.classSelect;
    this.parent.filter_list.price_below = Number(this.price_below);
    this.parent.filter_list.price_above = Number(this.price_above);
    this.parent.filter_list.special = this.special;
    this.callback();
  }

  close(){
    this.viewCtrl.dismiss();
  }
}
