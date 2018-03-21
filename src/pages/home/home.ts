import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  title = 'Home';
  constructor(
    protected platform: Platform,
    protected navCtrl: NavController,
    protected api: ApiService
  ) {
    // this.api.startQueue([
    //   this.api.getUserById(1),
    //   this.api.getMe()
    // ]).then(data => {
    //   console.log(data[0]);
    //   console.log(data[1]);
    // }, err => {
    //   console.log(err)
    // });
  }
}
