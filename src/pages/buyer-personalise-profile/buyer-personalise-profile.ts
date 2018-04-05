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
  edit_mode:boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    protected api: ApiService
  ) {
    this.personal_info = navParams.get('personal_info');
    console.log(this.personal_info)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyerPersonaliseProfilePage');
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            let profileModal = this.modalCtrl.create(ImageCropper, { pickMethod: 0 });
            profileModal.onDidDismiss(data =>{
              console.log(data )
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
