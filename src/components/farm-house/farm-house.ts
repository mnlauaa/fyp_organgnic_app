import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

@Component({
  selector: 'farm-house',
  templateUrl: 'farm-house.html'
})
export class FarmHouse {
  my_info: any;
  farm_id: any;
  favourite: any = false;
  user_info: any = {};
  news_list: any = [];
  tab_select: any = 1;
  reviews_list: any = [];
  my_review: any;

  comment_input: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiService,
    private ev: Events,
    private storage: Storage,
  ) {
    this.farm_id = navParams.get('id');
    this.storage.get('user_info').then((user_info)=>{
			if(user_info){
        this.my_info = user_info;	  
        console.log(user_info)
    }
    })
    
    this.api.startQueue([
      this.api.getFarmsById(this.farm_id),
      this.api.getFarmsNews(this.farm_id)
    ]).then(data=>{
      data[1].map(n=>n.datetime = moment(n.datetime).fromNow());
      this.user_info = data[0]
      this.news_list = data[1]
      this.isFavourite()
      this.updateReviews()
    }),err=>{
      console.log(err)
    }
  }

  updateReviews(){
    this.api.startQueue([
      this.api.getMe()
    ]).then((me)=>{
      this.api.getFarmReviews(this.farm_id).then(data=>{
        data.map((r)=>{
          r.date = moment(r.date).format("DD MMM, YYYY")
          if(r.buyer_id == me[0].id)
            this.my_review = r
          else
            this.reviews_list.push(r)
        })
        console.log(this.my_review)
        console.log(this.reviews_list)
      })
    }),err=>{
      console.log(err);
    }
  }

  submitReviews(){
    this.api.startQueue([
      this.api.postFarmReviews(this.farm_id, this.comment_input)
    ]).then((data)=>{
      console.log(data)
    }),err=>{
      console.log(err);
    }
  }

  isFavourite(){
    this.api.startQueue([
      this.api.getFarmisFavorite(this.farm_id)
    ]).then(data=>{
      this.favourite = data[0].isFarmReview;

    }),err=>{
      console.log(err);
    }
  }

  onFavourite(){
    this.api.startQueue([
      this.api.postMyFavourite(this.farm_id)
    ]).then(data=>{
      this.favourite = true;
      console.log(data);
    }),err=>{
      console.log(err);
    }
  }

  disFavourite(){
    this.api.startQueue([
      this.api.deleteMeFavourite(this.farm_id)
    ]).then(data =>{
      this.favourite = false;
      console.log(data);
    }), err=>{
      console.log(err)
    }
  }
}
 