import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController, AlertController  } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'
import { ImageCropper } from '../../components/image-cropper/image-cropper'
import { PhotoPopup } from '../../components/photo-popup/photo-popup'
import * as moment from 'moment';

@Component({
  selector: 'page-single-order',
  templateUrl: 'single-order.html',
})
export class SingleOrderPage {
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
    console.log(this.order);

    let str = "" + this.order.id
    let pad = "00000"
    this.order_id = pad.substring(0, pad.length - str.length) + str
    this.time = this.order.date.getHours() + ':' + this.order.date.getMinutes()
    this.date = moment(this.order.date).format( "D MMM, YYYY")
  }

  onSubmit(){
    var formData: FormData = new FormData();
    formData.append('status', this.order.status)
    formData.append('receipt', this.imgFile, 'receipt-' + Date.now() + '.png')
    this.api.startQueue([
      this.api.putOrder(formData, this.order.id)
    ]).then(data=>{
      console.log(data)
    }), err=>{
      console.log(err)
    }
  }

  openPhotoPopup() {
    let modal = this.modalCtrl.create(PhotoPopup, {
      photo_url: this.order.receipt_url,
    });
    modal.present();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Remove Order',
      message: 'Do you want to remove this order?',
      buttons: [
        {
          text: 'Remove',
          handler: () => {
            this.api.startQueue([
              this.api.deleteOrder(this.order.id)
            ]).then(()=>{
              this.navCtrl.pop();
            }), err=>{
              console.log(err)
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
      ]
    });
    alert.present();
  }
  
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            let profileModal = this.modalCtrl.create(ImageCropper, { pickMethod: 0, type: 2 });
            profileModal.onDidDismiss(data =>{
              if(data){
                this.order.receipt_url = data.imageURL;
                this.imgFile = data.file;
              }
            })
            profileModal.present();
          }
        },
        {
          text: 'Pick Image',
          handler: () => {
            let profileModal = this.modalCtrl.create(ImageCropper, { pickMethod: 1, type: 2 });
            profileModal.onDidDismiss(data =>{
              if(data){
                this.order.receipt_url = data.imageURL;
                this.imgFile = data.file;
              }
            })
            profileModal.present();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
 
    actionSheet.present();
  }

}
