import { Component } from '@angular/core';
import { NavController, NavParams, ModalController} from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service';
import { TheMarketPage } from '../the-market/the-market'
import { FarmHouse } from '../../components/farm-house/farm-house'
import { ChatRoomPage } from '../chat-room/chat-room'

@Component({
  selector: 'page-partners',
  templateUrl: 'partners.html',
})
export class PartnersPage {
  title = 'Our Partners'
  farm_list: any;
  user_info: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiService,
    private modalCtrl: ModalController,
  ) {
    this.user_info = navParams.get('user_info');
    console.log(this.user_info )
    this.api.startQueue([
      this.api.getFarms()
    ]).then(data=>{
      this.farm_list = data[0]
      console.log("farm", this.farm_list)
    }),err=>{
      console.log(err)
    }
  }
  
  openChat(f){
    this.navCtrl.push(ChatRoomPage, {
      user_info: this.user_info,
      other_id: f.id,
      my_id: this.user_info.id
    });
  }

  openProductModal(f){
    let profileModal = this.modalCtrl.create(FarmHouse, { 
      id: f.farm_id,
    });
    profileModal.onDidDismiss(()=>{})
    profileModal.present();
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
