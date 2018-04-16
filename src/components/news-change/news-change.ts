import { Component } from '@angular/core';
import { NavParams, Platform, ViewController, ActionSheetController, ModalController } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service';
import { ImageCropper } from '../image-cropper/image-cropper'


@Component({
  selector: 'news-change',
  templateUrl: 'news-change.html'
})
export class NewsChangeComponent {

  title = 'Edit News';
  news: any;
  imgFile: any;

  constructor(
    private params: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    public  view: ViewController,
    public api: ApiService
  ) {
    this.news = params.get('news');
    console.log(this.news.image_url);
    console.log('Hello NewsChangeComponent Component');
  }

  onSubmit(){
    let formData: FormData = new FormData();
      if(this.imgFile)
        formData.append('news', this.imgFile, 'product-' + Date.now() + '.png')
      formData.append('title', this.news.title)
      formData.append('description', this.news.description)
    this.api.startQueue([
      this.api.putNews(formData, this.news.id)
    ]).then(data =>{
      console.log(data)
      this.view.dismiss();
    }), err=>{
      console.log(err);
      this.view.dismiss();
    }
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
