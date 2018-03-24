import { Component } from '@angular/core';
import { NavController, NavParams, Events, MenuController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../providers/api-service/api-service';
import { SignupPage } from '../signup/signup';
import { ContactusPage } from '../contactus/contactus';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private storage: Storage,
    private ev: Events,
    private menu: MenuController
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  } 

  SignUpOpenPage() {
    this.navCtrl.push(SignupPage);
  }

  ContactOpenPage() {
    this.navCtrl.push(ContactusPage);
  }

  login(){
    if (this.loginForm.valid) {
      let username = this.loginForm.controls['username'].value,
          password = this.loginForm.controls['password'].value

      this.api.startQueue([    
        this.api.postMeLogin({username: username,
                              password: password})
      ]).then(data => {
        let user_info = {
          token: data[0].token,
          identity: data[0].identity
        }
        this.storage.set('user_info', user_info).then((val)=>{
          this.ev.publish('user', user_info.token, user_info.identity);
          this.navCtrl.pop();
        })
      }, err => {
        // this.storage.clear()
        console.log(err);
      })
    }
  }

}
