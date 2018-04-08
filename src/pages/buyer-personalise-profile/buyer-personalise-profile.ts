import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController  } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'
import { ImageCropper } from '../../components/image-cropper/image-cropper'


@IonicPage()
@Component({
  selector: 'page-buyer-personalise-profile',
  templateUrl: 'buyer-personalise-profile.html',
})
export class BuyerPersonaliseProfilePage {
  title = "Personalise Profile";
  personal_info: any;
  edit_mode: boolean = false;
  imgURL: any;
  imgFile: any;
  edit_info: any = {};
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    protected api: ApiService
  ) {
    this.personal_info = navParams.get('personal_info');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyerPersonaliseProfilePage');
  }

  onSubmit(){
    let data = this.edit_info
        data.display_name = data.display_name ? data.display_name : this.personal_info.display_name;
        data.address = data.address ? data.address : this.personal_info.address;
        data.phone_number = data.phone_number ? data.phone_number : this.personal_info.phone_number;

    this.api.startQueue([
      this.api.putMe(data, this.imgFile)
    ]).then(data=>{
      console.log(data)
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
    this.imgURL = this.personal_info.profile_pic_url;
    this.edit_mode = true;
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            let profileModal = this.modalCtrl.create(ImageCropper, { pickMethod: 0 });
            profileModal.onDidDismiss(data =>{
              if(data)
                this.imgURL = data.imageURL;
                this.imgFile = data.file;
            })
            profileModal.present();
          }
        },
        {
          text: 'Pick Image',
          handler: () => {
            let profileModal = this.modalCtrl.create(ImageCropper, { pickMethod: 1 });
            profileModal.onDidDismiss(data =>{
              console.log(data)
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
