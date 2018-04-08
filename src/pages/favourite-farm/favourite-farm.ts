import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'

import { TheMarketPage } from '../the-market/the-market'
@Component({
  selector: 'page-favourite-farm',
  templateUrl: 'favourite-farm.html',
})
export class FavouriteFarmPage {
  title = 'Favourite Farms';
  farmList = null;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private api: ApiService
  ) {
    this.api.startQueue([
      this.api.getMyFavourite()
    ]).then(data =>{
      this.farmList = data[0];
      console.log(this.farmList);
    }), err=>{
      console.log(err)
    }
  }

  onShop(id){
    let filter_list = {
      favourite: false,
      selection: [id],
      price_below: null,
      price_above: null
    }
    this.navCtrl.setRoot(TheMarketPage, {filter_list: filter_list});
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FavouriteFarmPage');
  }

}
