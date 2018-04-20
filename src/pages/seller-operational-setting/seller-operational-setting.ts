import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController, ToastController } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-seller-operational-setting',
  templateUrl: 'seller-operational-setting.html',
})
export class SellerOperationalSettingPage {
  title = "Operational Setting";
  // settingInfo: any;
  user_info: any;
  edit_info = {shipping_cost: null, 
               shipping_margin: null,
               home_additional_cost: null,
               pickup: [],
               bank_deposit_info: null};
  delivery_edit = false;
  new_location = null;
  temp_switch = null;
  charging_edit = false;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private ev: Events,
    private storage: Storage,
    private alertCtrl: AlertController,
    protected api: ApiService,
    private toastCtrl: ToastController
  ) {
      this.user_info = navParams.get('user_info');
      this.ev.subscribe('farm_info', user_info => {
        this.user_info = user_info
        for(let i = 0; i < this.user_info.pickup.length; i++)
          this.edit_info.pickup[i] = {};
      });

      for(let i = 0; i < this.user_info.pickup.length; i++)
        this.edit_info.pickup[i] = {};
      // console.log(this.user_info);
  }

  presentConfirm(id) {
    let alert = this.alertCtrl.create({
      title: 'Remove this location ',
      message: 'Do you want remove this location?',
      buttons: [
        {
          text: 'Remove',
          handler: () => {this.submitPickup('active', 0, id)}
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    alert.present();
  }

  addNewPickup(location){
    this.api.startQueue([
      this.api.postMeFarmPickup(location),
    ]).then(data=>{
      this.api.getMeFarm().then((user)=>{
        this.ev.publish('farm_info', user);
        console.log(user);
        this.new_location = null;
      })
    }), err=>{
      console.log(err)
    }
  }
  
  submitFarmSetting(type, value){
    console.log(value);
    if(value === null)
      console.log("OhNO")
    else{
      if(value === true)
        value = 1
      if(value === false)
        value = 0
      this.api.startQueue([
        this.api.putMeFarmSetting(type, value),
      ]).then(data=>{
        this.api.getMeFarm().then((user)=>{
          this.ev.publish('farm_info', user);
          console.log(user);
        })
      }), err=>{
        console.log(err)
      }
    }
  }

  submitPickup(type, value, id){
    if(value === null)
      console.log("OhNO")
    else{
      if(value === true)
        value = 1
      if(value === false)
        value = 0
      this.api.startQueue([
        this.api.putMeFarmPickup(type, value, id),
      ]).then(data=>{
        this.api.getMeFarm().then((user)=>{
          this.ev.publish('farm_info', user);
          console.log(user);
        })
      }), err=>{
        console.log(err)
      }
    }
  }

  presentToast(str) {
    let toast = this.toastCtrl.create({
      message: str,
      duration: 2000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {});
    toast.present();
  }

  onSubmitDelivery(){
    // this.settingInfo.home_additional_cost = this.shipping_edit_info.home_additional_cost;
    // this.shipping_edit = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellerOperationalSettingPage');
  }

}
