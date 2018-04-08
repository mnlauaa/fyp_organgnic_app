import { Component } from '@angular/core';
import { NavController, NavParams, Events, ModalController, ActionSheetController, } from 'ionic-angular';
import { ImageCropper } from '../../components/image-cropper/image-cropper'
import { Storage } from '@ionic/storage';
import { ApiService } from '../../providers/api-service/api-service'

@Component({
  selector: 'page-seller-personalise-profile',
  templateUrl: 'seller-personalise-profile.html',
})
export class SellerPersonaliseProfilePage {
  title = "Personalise Profile";
  user_info: any = {}
  edit_info: any = {};

  edit_mode = false;
  icon_imgURL = null;
  banner_imgURL = null;

  iconFile = null;
  bannerFile = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ev: Events,
    private storage: Storage,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    protected api: ApiService
  ) {
    this.user_info = navParams.get('user_info');
    this.ev.subscribe('user_info', user_info => {
      this.user_info = user_info
    });
  }

  onSubmit(){
    let data = this.edit_info
        data.display_name = data.display_name ? data.display_name : this.user_info.display_name;
        data.address = data.address ? data.address : this.user_info.address;
        data.phone_number = data.phone_number ? data.phone_number : this.user_info.phone_number;
        data.about_intro = data.about_intro ? data.about_intro : this.user_info.about_intro;

    this.api.startQueue([
      this.api.putMeFarm(data, this.iconFile, this.bannerFile)
    ]).then(data=>{
      this.api.getMeFarm().then(user =>{
        this.storage.set('user_info', user).then((val)=>{
          this.ev.publish('user_info', val);
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
      about_intro: null
    }
    this.icon_imgURL = this.user_info.profile_pic_url;
    this.banner_imgURL = this.user_info.banner_pic_url;
    this.edit_mode = true;
  }

  presentActionSheet(type) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            let profileModal = this.modalCtrl.create(ImageCropper, { pickMethod: 0, type: type});
            profileModal.onDidDismiss(data =>{
              if(data){
                if(type == 0){
                  this.icon_imgURL = data.imageURL;
                  this.iconFile = data.file;
                } else {
                  this.banner_imgURL = data.imageURL;
                  this.bannerFile = data.file;
                }
              }
            })
            profileModal.present();
          }
        },
        {
          text: 'Pick Image',
          handler: () => {
            let profileModal = this.modalCtrl.create(ImageCropper, { pickMethod: 1, type: type});
            profileModal.onDidDismiss(data =>{
              if(data){
                if(type == 0){
                  this.icon_imgURL = data.imageURL;
                  this.iconFile = data.file;
                } else {
                  this.banner_imgURL = data.imageURL;
                  this.bannerFile = data.file;
                }
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad SellerPersonaliseProfilePage');
  }

}
