import { Component } from '@angular/core';
import { NavController, NavParams, Events, ModalController, ActionSheetController } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'
import { ImageCropper } from '../../components/image-cropper/image-cropper'


@Component({
  selector: 'add-news',
  templateUrl: 'add-news.html',
})
export class AddNewsComponent {
  title = "Create News";
  imgURL = null;
  user_info:any = {}
  news_info ={ farm_id: null, datetime: null, title: null, description: null, image_url: null}
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    protected api: ApiService, 
    private ev: Events,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController) {
    this.user_info = navParams.get('user_info');
    this.ev.subscribe('user_info', user_info => {
      this.user_info = user_info
    });
    console.log(this.user_info);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewsPage');
  }

  OnSubmit(){
    this.news_info.image_url = this.imgURL;
    this.news_info.farm_id = this.user_info.farm_id;
    this.news_info.datetime = Date.now(); 
    this.api.startQueue([
      this.api.postNews(this.news_info)
    ]).then(data=>{},err=>{
        console.log(err)
      })
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
                  this.imgURL = data.imageURL;
                } else {
                  this.imgURL = data.imageURL;
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
                  this.imgURL = data.imageURL;
                } else {
                  this.imgURL = data.imageURL;
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
}