import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'
import { TheMarketPage } from '../the-market/the-market';
import { SingleNewsPage } from '../single-news/single-news';
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
      this.api.getNews(null)
    ]).then(data => {
      data[0].news_list.map(n=>n.datetime = moment(n.datetime).fromNow());
      this.newsList = data[0].news_list;
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

  openSignleNews(n){
    this.navCtrl.push(SingleNewsPage, {news: n});
  }
}
