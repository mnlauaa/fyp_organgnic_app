import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController  } from 'ionic-angular';
import { ImageCropper } from '../../components/image-cropper/image-cropper'
/**
 * Generated class for the BuyerPersonaliseProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buyer-personalise-profile',
  templateUrl: 'buyer-personalise-profile.html',
})
export class BuyerPersonaliseProfilePage {
  title = "Personalise Profile";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController) {
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
            profileModal.present();
          }
        },
        {
          text: 'Pick Image',
          handler: () => {
            let profileModal = this.modalCtrl.create(ImageCropper, { pickMethod: 1 });
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
