import { Component } from '@angular/core';
import { ToastController, IonicPage, NavController, NavParams, MenuController, Loading } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  user:any;
  constructor(
    public navCtrl: NavController, 
    private toastCtrl: ToastController,
    public navParams: NavParams,
    protected api: ApiService,
    private menu: MenuController) {
      this.user = {};
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


 

  onSubmit(){
    if(!this.user.username||!this.user.password||!this.user.repassword||!this.user.repassword){
      let toast = this.toastCtrl.create({
        message:  'missing information',
        duration: 3000,
        position: 'bottom'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
      return
    }

    if(this.user.password != this.user.repassword){
      let toast = this.toastCtrl.create({
        message:  'mismatched password',
        duration: 3000,
        position: 'bottom'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
      return
    }

    this.api.startQueue([ 
      this.api.postSignIn(this.user)   
    ]).then(data=>{
      console.log(data)
      }).catch((err)=>{
      let toast = this.toastCtrl.create({
        message:  err.error,
        duration: 3000,
        position: 'bottom'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
    })
  }
}
