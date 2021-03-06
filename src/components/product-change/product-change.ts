import { Component } from '@angular/core';
import { NavParams, Platform, ViewController, ActionSheetController, ModalController } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service';
import { ImageCropper } from '../image-cropper/image-cropper'
import * as moment from 'moment';
@Component({
  selector: 'product-change',
  templateUrl: 'product-change.html'
})
export class ProductChange {
  title: String;
  product: any;
  action: any;
  imgFile: any;
  category: any;
  description: any;
  special_edit: boolean = false;

  constructor(
    private params: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    public  view: ViewController,
    public api: ApiService
  ) {
    this.product = params.get('product');
    if(this.product){
      this.title = "Edit Product"
      this.product.qty *= this.product.weight
      if(this.product.special_expiry)
        this.product.special_expiry = moment(this.product.special_expiry).format("YYYY-MM-DD");
      this.action = 0
    }
    else{
      this.title = "Add Product"
      this.product = {};
      this.action = 1
    }

    this.category = [
      { name: "Bulbs", id: 0 },
      { name: "Flowers", id: 1 },
      { name: "Fruits", id: 2 },
      { name: "Fungi", id: 3 },
      { name: "Leaves", id: 4 },
      { name: "Roots", id: 5 },
      { name: "Seeds", id: 6 },
      { name: "Stems", id: 7 },
      { name: "Tubers", id: 8 }
    ]
    console.log(new Date("2015-01-03"));
  }

  onSubmit(){
    this.product.qty = this.product.qty / this.product.weight
    if(this.action == 1){
      // add
      let formData: FormData = new FormData();
          formData.append('product', this.imgFile, 'product-' + Date.now() + '.png')
          formData.append('name', this.product.name)
          formData.append('classification', this.product.classification)
          formData.append('qty', this.product.qty)
          formData.append('price', this.product.price)
          formData.append('weight', this.product.weight)
      this.api.startQueue([
        this.api.postProducts(formData)
      ]).then(data =>{
        console.log(data)
        this.view.dismiss()
      }), err=>{
        console.log(err);
      }
    } else {
      // edit
      let formData: FormData = new FormData();
        if(this.imgFile)
          formData.append('product', this.imgFile, 'product-' + Date.now() + '.png')
        formData.append('name', this.product.name)
        formData.append('classification', this.product.classification)
        formData.append('qty', this.product.qty)
        formData.append('price', this.product.price)
        formData.append('weight', this.product.weight)
        if(this.special_edit){
          formData.append('special_price', this.product.special_price)
          formData.append('special_weight', this.product.special_weight)
          formData.append('special_expiry', this.product.special_expiry)
        }
        this.api.startQueue([
          this.api.putProducts(formData, this.product.id)
        ]).then(data =>{
          if(this.special_edit){
            let news_formData: FormData = new FormData();
            if(this.imgFile)
              news_formData.append('news', this.imgFile, 'product-' + Date.now() + '.png')
            else
              news_formData.append('img_url', this.product.image_url)
            let newsTitle = this.product.name + " have a " +   Math.ceil((this.product.special_price/this.product.price) * 100) +
                            "% off!"
            news_formData.append('title', newsTitle)
            news_formData.append('description', this.description)
            this.api.postNews(news_formData).then((data)=>{
              console.log(data)
            })
          }
          this.view.dismiss()
        }), err=>{
          console.log(err);
        }
    }
  }

  hello(){
    console.log(this.product.special_expiry)
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
                this.product.image_url = data.imageURL;
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
                this.product.image_url = data.imageURL;
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
