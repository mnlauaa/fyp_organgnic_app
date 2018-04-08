import { Component, ViewChild, ElementRef } from '@angular/core';
import { Camera, CameraOptions  } from '@ionic-native/camera';
import { NavParams, Platform, ViewController } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'
import Cropper from 'cropperjs';

@Component({
  selector: 'image-cropper',
  templateUrl: 'image-cropper.html'
})

export class ImageCropper{
  @ViewChild('imageSrc') imageElement: ElementRef;
  cropperInstance: any;
  croppedImg: any;
  pickMethod: any;
  
  getCameraOptions(type) {
    let photo_type = null;
    if(type == 0){
      photo_type = this.camera.PictureSourceType.CAMERA
    } else {
      photo_type = this.camera.PictureSourceType.PHOTOLIBRARY
    }
    // just an example working config
    let cameraOpts: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: photo_type,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      correctOrientation: true
    }
    return cameraOpts;
  }

  text: string;

  constructor(
    private params: NavParams,
    private camera: Camera,
    private plt: Platform,
    public  view: ViewController,
    public api: ApiService
  ) {
    console.log('pickMethod', params.get('pickMethod'));
    this.pickMethod = params.get('pickMethod');
    if(this.plt.is('cordova'))
      this.camera.getPicture(this.getCameraOptions(this.pickMethod)).then((imageData) => {
        this.imageElement.nativeElement.src = imageData;
        this.cropImage();
      }, (error) => {
        // do what you want
      });
    
  }

  zoom(num){
    this.cropperInstance.zoom(num);
  }

  move(x, y){
    this.cropperInstance.move(x, y);
  }

  rotate(num){
    this.cropperInstance.rotate(num);
  }

  changeImage(){
    this.camera.getPicture(this.getCameraOptions(this.pickMethod)).then((imageData) => {
      this.imageElement.nativeElement.src = imageData;
      this.cropImage();
    }, err => {

    });
  }

  cropImage() {
    this.cropperInstance = new Cropper(this.imageElement.nativeElement, {
        aspectRatio: 1 / 1, // square
        modal: true,
        guides: false,
        highlight: false,
        background: false,
        autoCrop: true,
        autoCropArea: 0.9,
        responsive: false,
        zoomable: true,
        movable: true
    });
  }

  cropDone() {
    this.cropperInstance.getCroppedCanvas({ width: 150, height: 150}).toBlob((blob)=>{
      this.croppedImg = this.cropperInstance.getCroppedCanvas({ width: 150, height: 150}).toDataURL('image/jpeg');
        let data = {
          imageURL: this.croppedImg,
          file: blob
        }
        this.view.dismiss(data);
      })

    
    // console.log(this.croppedImg)
    // this.view.dismiss(this.croppedImg);
    // console.log(this.croppedImg)
    // do whatever you want with base64 variable croppedImg
  }

}
