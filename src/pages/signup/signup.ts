import { Component } from '@angular/core';
import { ToastController, IonicPage, NavController, NavParams, MenuController, Loading, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../providers/api-service/api-service'
import { HomePage } from '../home/home'


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  user:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiService,
    private toastCtrl: ToastController,
    private menu: MenuController,
    private storage: Storage,
    private ev: Events,
  ) {
      this.user = {};
      console.log(!null)
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
    console.log(this.user)
    this.api.startQueue([ 
      this.api.postSignIn(this.user)   
    ]).then(data=>{
      console.log(data[0])
      this.storage.set('user:token', data[0].token).then((val)=>{
        this.ev.publish('user:token', val);
        this.api.getMe().then(user =>{
          console.log(user);
          let user_info = {
            identity: user.identity,
            display_name: user.display_name,
            profile_pic_url: user.profile_pic_url,
            address: user.address,
            phone_number: user.phone_number
          }

          this.storage.set('user_info', user_info).then((val)=>{
            this.ev.publish('user_info', val);
            this.navCtrl.setRoot(HomePage);
          })
        })
      })
    }).catch((err)=>{
      let toast = this.toastCtrl.create({
        message:  err.error,
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    })
  }
}
