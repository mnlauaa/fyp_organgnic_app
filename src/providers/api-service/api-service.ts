import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../core/base-service';
import { Events, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class ApiService extends BaseService{
  protected api_prefix: string = 'http://192.168.1.205:3000';
  private token = null;
  

  constructor(
    public http: HttpClient,
    private ev: Events,
    protected loadingCtrl: LoadingController,
    private storage: Storage,
  ) {
    super(http, loadingCtrl);
    this.ev.subscribe('user:token', (token) => {
      this.token = token;
      console.log("login_subscribe: ", this.token)
    })
  }

  public getUserById(id){
    return this.get('/users/' + id);
  }

  public getMe(){
    return this.get('/me', this.token)
  }

  public getShopingCart(){
    return this.get('/me/shopping_cart', this.token);
  }

  public getNews(){
    return this.get('/news');
  }

  public getFarms(){
    return this.get('/users/farms');
  }

  public getMyFavourite(){
    return this.get('/me/favourite', this.token);
  }

  public getProducts(sorting, keyword, filter){
    let params = {sorting: sorting}
    if(keyword)
      params['keyword'] = keyword;

    if(filter){
      if(filter.selection)
      params['brand'] = filter.selection
      if(filter.price_below)
        params['price_below'] = filter.price_below
      if(filter.price_above)
        params['price_above'] = filter.price_above
    }
    console.log("get product api", params)
    return this.get('/products', null, params);
  }

  public postMeLogin(data){
    let type = 'application/x-www-form-urlencoded';
    const body = new HttpParams().set('username', data.username)
                                 .set('password', data.password);

    return this.post('/me/login', body, type, this.token).then((data)=>{
      this.ev.publish('user:token', data.token);
      console.log('login: ',data)
      return data;
    })
  }

  public postShopingCart(data){
    let type = 'application/x-www-form-urlencoded';
    const body = new HttpParams().set('farm_id', data.farm_id)
                                 .set('product_id', data.product_id)
                                 .set('qty', data.qty)
    return this.post('/me/shopping_cart', body, type, this.token)
  }

}
