import { Component } from '@angular/core';
import { NavController, NavParams, Events, ViewController, ModalController, ActionSheetController } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'
import { ImageCropper } from '../../components/image-cropper/image-cropper'


@Component({
  selector: 'add-news',
  templateUrl: 'add-news.html',
})
export class AddNewsComponent {
  title = "Create News";
  imgFile: any;
  user_info:any = {}
  news: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public  view: ViewController,
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
    let formData : FormData = new FormData();
      formData.append('news', this.imgFile, 'news-' + Date.now() + '.png')
      formData.append('title', this.news.title)
      formData.append('description', this.news.description) 
    this.api.startQueue([
      this.api.postNews(formData)
    ]).then(data=>{
      console.log(data)
      this.view.dismiss()
    },err=>{
        console.log(err)
      })
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
                this.news.image_url = data.imageURL;
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
                this.news.image_url = data.imageURL;
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