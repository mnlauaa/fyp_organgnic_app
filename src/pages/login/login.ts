
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
    private storage: Storage
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
        this.storage.set('jwt_token', data[0].token).then((val)=>{
          this.navCtrl.pop();
        })
      }, err => {
        console.log(err);
      })
    }
  }

}
