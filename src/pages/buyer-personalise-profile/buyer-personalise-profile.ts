import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController, Events  } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiService } from '../../providers/api-service/api-service'
import { ImageCropper } from '../../components/image-cropper/image-cropper'

@Component({
  selector: 'page-buyer-personalise-profile',
  templateUrl: 'buyer-personalise-profile.html',
})
export class BuyerPersonaliseProfilePage {
  title = "Personalise Profile";
  user_info: any = {};
  edit_mode: boolean = false;
  imgURL: any;
  imgFile: any;
  edit_info: any = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private ev: Events,
    private storage: Storage,
    protected api: ApiService
  ) {
    this.user_info = navParams.get('user_info');
    this.ev.subscribe('user_info', user_info => {
      this.user_info = user_info
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyerPersonaliseProfilePage');
  }

  onSubmit(){
    let data = this.edit_info
        data.display_name = data.display_name ? data.display_name : this.user_info.display_name;
        data.address = data.address ? data.address : this.user_info.address;
        data.phone_number = data.phone_number ? data.phone_number : this.user_info.phone_number;
    
    this.api.startQueue([
      this.api.putMe(data, this.imgFile)
    ]).then(data=>{
      this.api.getMe().then(user =>{
        let temp_user_info = {
          identity: user.identity,
          display_name: user.display_name,
          profile_pic_url: user.profile_pic_url,
          address: user.address,
          phone_number: user.phone_number
        }

        this.storage.set('user_info', temp_user_info).then((val)=>{
          this.ev.publish('user_info', temp_user_info);
        })
        this.edit_mode = false;
      })
    }, err=>{
      console.log(err)
    })
  }

  editModeOn(): void {
    this.edit_info = {
      display_name : null,
      address: null,
      phone_number: null,
    }
    this.imgURL = this.user_info.profile_pic_url;
    this.edit_mode = true;
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            let profileModal = this.modalCtrl.create(ImageCropper, { pickMethod: 0, type: 0 });
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
            let profileModal = this.modalCtrl.create(ImageCropper, { pickMethod: 1, type: 0 });
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
