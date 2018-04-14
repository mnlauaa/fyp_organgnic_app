import { Component } from '@angular/core';
import { NavController, NavParams, Events} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../providers/api-service/api-service'
import * as moment from 'moment';
import { AddNewsPage } from '../add-news/add-news';

@Component({
  selector: 'page-seller-personalise-news',
  templateUrl: 'seller-personalise-news.html',
})
export class SellerPersonaliseNewsPage {
  title = "Your News";
  newsList: any;
  user_info = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,private ev: Events,
    private storage: Storage, protected api: ApiService) {
      this.user_info = navParams.get('user_info');
      this.ev.subscribe('user_info', user_info => {
        this.user_info = user_info
      });
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellerPersonaliseNewsPage');
  }

  addnew(){
    this.navCtrl.push(AddNewsPage, {user_info: this.user_info});
  }
}
