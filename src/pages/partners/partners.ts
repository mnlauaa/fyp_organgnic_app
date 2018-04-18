import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service';
import { TheMarketPage } from '../the-market/the-market'

@Component({
  selector: 'page-partners',
  templateUrl: 'partners.html',
})
export class PartnersPage {
  title = 'Our Partners'
  farm_list: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiService
  ) {
    this.api.startQueue([
      this.api.getFarms()
    ]).then(data=>{
      this.farm_list = data[0]
      console.log("farm", this.farm_list)
    }),err=>{
      console.log(err)
    }
  }

  onShop(id){
    let filter_list = {
      favourite: false,
      selection: [id],
      classSelect: [],
      price_below: null,
      price_above: null,
      special: null
    }
    this.navCtrl.setRoot(TheMarketPage, {filter_list: filter_list});
  }
}
