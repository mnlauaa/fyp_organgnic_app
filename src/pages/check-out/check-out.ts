import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController, ToastController } from 'ionic-angular';
import { ConfirmOrderPage } from '../confirm-order/confirm-order';
import { ApiService } from '../../providers/api-service/api-service'
import { ImageCropper } from '../../components/image-cropper/image-cropper'
import { PhotoPopup } from '../../components/photo-popup/photo-popup'

@Component({
  selector: 'page-check-out',
  templateUrl: 'check-out.html',
})
export class CheckOutPage {
  title = 'Payment';
  order: any;
  user_info: any;
  list_num: any;
  payment_way: any;
  deposite_way: any;

  imgURL: any;
  imgFile: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    protected api: ApiService
  ) {
    this.order = navParams.get('order');
    this.list_num = navParams.get('list_num');
    this.user_info = navParams.get('user_info');
    console.log(this.order);
    console.log(this.list_num);
    this.payment_way = 0;
    this.deposite_way = 0;
  }

  onSubmit() {
    if(this.payment_way == 1 && this.deposite_way == 0 && !this.imgFile){
      let toast = this.toastCtrl.create({
        message: 'You need to upload the receipt',
        duration: 1500,
        position: 'bottom'
      }); 
      toast.present();
    } else {
      let location;
      if(this.order.farm.pickup_way == 'point')
        location = this.order.farm.pickup_location
      else
        location = this.user_info.address;
      var formData: FormData = new FormData();
      formData.append('payment_method', this.payment_way)
      if(this.order.farm.pickup_way == 'home'){
        formData.append('pickup_method', '0')
        formData.append('pickup_location', this.user_info.address)
      }
      else{
        formData.append('pickup_method', '1')
        formData.append('pickup_location', this.order.farm.pickup_location)
      }
    
      if(this.payment_way == 1){
        formData.append('deposite_method', this.deposite_way)
        if(this.deposite_way == 0)
          formData.append('receipt', this.imgFile, 'receipt-' + Date.now() + '.png')
      }
      formData.append('status', this.order.productList[0].status)
      this.api.startQueue([
        this.api.putOrder(formData, this.order.productList[0].order_id)
      ]).then(()=>{
        this.navCtrl.push(ConfirmOrderPage, {
          order: this.order,
          payment_way: this.payment_way,
          deposite_way: this.deposite_way,
          location: location,
          time: new Date()
        });
      }),err=>{

      }
      
      // if(this.order.farm.pickup_way == 'point')
      //   location = this.order.farm.pickup_location
      // else
      //   location = this.user_info.address;
      // this.navCtrl.push(ConfirmOrderPage, {
      //   order: this.order,
      //   payment_way: this.payment_way,
      //   deposite_way: this.deposite_way,
      //   location: location,
      //   time: new Date()
      // });
    }
  }

  openPhotoPopup() {
    let modal = this.modalCtrl.create(PhotoPopup, {
      photo_url: this.imgURL,
    });
    modal.present();
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
                this.imgURL = data.imageURL;
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
                this.imgURL = data.imageURL;
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
