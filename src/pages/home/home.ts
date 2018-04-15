import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'
import { TheMarketPage } from '../the-market/the-market';
import * as moment from 'moment';
// import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  title = 'Home';
  newsList: any;
  search_bar: String;
  constructor(
    protected platform: Platform,
    protected navCtrl: NavController,
    protected api: ApiService,
    // private storage: Storage
  ) {
    this.api.startQueue([
      this.api.getNews(this.search_bar)
    ]).then(data => {
      data[0].map(n=>n.datetime = moment(n.datetime).fromNow());
      this.newsList = data[0];
      console.log(this.newsList);
    }, err => {
      console.log(err)
    });
  }

  searchBarSend(){
    console.log(this.search_bar);
    this.navCtrl.setRoot(TheMarketPage, {
      keyword: this.search_bar
    });
  }
}
