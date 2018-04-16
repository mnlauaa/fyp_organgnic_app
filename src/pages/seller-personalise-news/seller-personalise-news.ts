import { Component } from '@angular/core';
import { NavController, NavParams, Events, PopoverController, ActionSheetController, ModalController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../providers/api-service/api-service'
import * as moment from 'moment';
import { AddNewsComponent } from '../../components/add-news/add-news';
import { NewsChangeComponent } from '../../components/news-change/news-change';

@Component({
  selector: 'page-seller-personalise-news',
  templateUrl: 'seller-personalise-news.html',
})
export class SellerPersonaliseNewsPage {
  title = "Your News";
  newsList: any;
  user_info = {};
  result_num:any = 0;
  search_bar: String;
  keyword: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private ev: Events,
    private storage: Storage, 
    public api: ApiService) {
      this.user_info = navParams.get('user_info');
      this.ev.subscribe('user_info', user_info => {
        this.user_info = user_info
      });
      // this.api.startQueue([
      //   this.api.getNews(this.keyword)
      // ]).then(data => {
      //   this.result_num = data[0].length;
      //   data[0].map(n=>n.datetime = moment(n.datetime).fromNow());
      //   this.newsList = data[0];
      //   console.log(this.newsList);
      // }, err => {
      //   console.log(err)
      // });
      this.getNewsBykeyword();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellerPersonaliseNewsPage');
  }

  addNews(){
    let newsModal = this.modalCtrl.create(AddNewsComponent,{user_info: this.user_info});
            newsModal.onDidDismiss(() =>{
              this.getNewsBykeyword();
            })
            newsModal.present();
  }

  presentActionSheet(n) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            this.editNews(n);
            console.log(this.newsList);

          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
              this.deleteNews(n);
              console.log('Destructive clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  editNews(n){
    let newsModal = this.modalCtrl.create(NewsChangeComponent,{news: n});
    newsModal.onDidDismiss(() =>{
      this.getNewsBykeyword();
    })
    newsModal.present();
  }

  getNewsBykeyword(){
    this.keyword = this.search_bar;
    this.search_bar = null;
    this.api.startQueue([
      this.api.getNews(this.keyword)
    ]).then(data => {
      this.newsList = data[0].news_list;
      this.result_num = data[0].result_num;
      console.log(this.newsList);
    },err=> {
      console.log(err)
    });
  }

  deleteNews(n){
    this.api.startQueue([
      this.api.deleteNews(n.id)
    ]).then(data =>{
      this.newsList.splice(this.newsList.indexOf(n), 1);
      this.result_num -= 1;
      console.log(this.newsList);
    }), err=>{
      console.log(err)
    }
  }
}
