import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'
import * as moment from 'moment';
// import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  title = 'Home';
  newsList: any;
  constructor(
    protected platform: Platform,
    protected navCtrl: NavController,
    protected api: ApiService,
    // private storage: Storage
  ) {
    
    // this.storage.get('jwt_token').then((val) => {
    //   console.log('token', val);
    // });

    this.api.startQueue([
      this.api.getNews()
    ]).then(data => {
      data[0].map(n=>n.datetime = moment(n.datetime).fromNow());
      this.newsList = data[0];
      console.log(this.newsList);
    }, err => {
      console.log(err)
    });
  }
}
