import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController, AlertController  } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'
import { EditOrder } from '../../components/edit-order/edit-order'
import { PhotoPopup } from '../../components/photo-popup/photo-popup'
import { ChatRoomPage } from '../chat-room/chat-room';

import { SellerOrderPage } from '../seller-order/seller-order'
import * as moment from 'moment';

@Component({
  selector: 'page-single-seller-order',
  templateUrl: 'single-seller-order.html',
})
export class SingleSellerOrderPage {
  order: any;
  order_id: any;
  time: any;
  date: any;
  imgFile: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    protected api: ApiService
  ) {
    this.order = navParams.get('order');
    this.order.date = new Date(this.order.date);
    // this.order.receipt_url = null
    console.log(this.order);

    let str = "" + this.order.id
    let pad = "00000"
    this.order_id = pad.substring(0, pad.length - str.length) + str
    this.time = moment(this.order.date).format("HH:mm");
    this.date = moment(this.order.date).format("D MMM, YYYY")
  }

  reload(){
    this.api.startQueue([
      this.api.getOrderById(this.order.id)
    ]).then(data=>{
      console.log('single', data[0])
      this.order = data[0]
    }), err=>{
      console.log(err);
    }
  }

  openChat(){
    this.navCtrl.push(ChatRoomPage, {
      user_info: this.order.buyer_id,
      other_id: this.order.seller_id,
      my_id: this.order.buyer_id
    });
  }

  editOrder(){
    let temp_order = Object.assign({}, this.order);
    let profileModal = this.modalCtrl.create(EditOrder, { order: temp_order});
    profileModal.onWillDismiss(data =>{
      this.navCtrl.setRoot(SellerOrderPage);
    })
    profileModal.present();
  }

  openPhotoPopup() {
    let modal = this.modalCtrl.create(PhotoPopup, {
      photo_url: this.order.receipt_url,
    });
    modal.present();
  }

  onSubmit() {
    var formData: FormData = new FormData();
    formData.append('status', this.order.status)
    formData.append('way', 'submit')
    this.api.startQueue([
      this.api.putOrder(formData, this.order.id)
    ]).then(data=>{
      console.log(data[0])
      this.navCtrl.setRoot(SellerOrderPage);
    }), err=>{
      console.log(err)
    }
  }

}
