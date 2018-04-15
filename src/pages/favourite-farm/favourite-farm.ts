import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
    private api: ApiService,
    private alertCtrl: AlertController
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

  presentConfirm(farm) {
    let alert = this.alertCtrl.create({
      title: 'Disfavourite '+ farm.display_name,
      message: 'Do you want to disfavourite this farm?',
      buttons: [
        {
          text: 'Sure',
          handler: () => {
            this.api.startQueue([
              this.api.deleteMeFavourite(farm.farm_id)
            ]).then(data =>{
              this.farmList.splice(this.farmList.indexOf(farm), 1);
              console.log(data);
            }), err=>{
              console.log(err)
            }
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
    alert.present();
  }

  onShop(id){
    let filter_list = {
      favourite: false,
      selection: [id],
      classSelect: [],
      price_below: null,
      price_above: null
    }
    this.navCtrl.setRoot(TheMarketPage, {filter_list: filter_list});
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FavouriteFarmPage');
  }

}
