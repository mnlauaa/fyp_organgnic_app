import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'

@Component({
  selector: 'page-single-news',
  templateUrl: 'single-news.html',
})
export class SingleNewsPage {
  newsList: any;
  news: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    protected api: ApiService,
  ) {
    this.news = navParams.get('news');
    // this.api.startQueue([
    //   this.api.getNewsById(this.news.id)
    // ]).then(data => {
    //   this.newsList = data[0].news_list;
    //   console.log(this.newsList);
    // }, err => {
    //   console.log(err)
    // });
  }

}
