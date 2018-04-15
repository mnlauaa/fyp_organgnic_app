import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../core/base-service';
import { Events, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Config } from '../../config'

@Injectable()
export class ApiService extends BaseService{
  protected api_prefix: string = Config.SERVER;
  private token = null;
  

  constructor(
    public http: HttpClient,
    private ev: Events,
    protected loadingCtrl: LoadingController,
    private storage: Storage
  ) {
    super(http, loadingCtrl);
    this.ev.subscribe('user:token', (token) => {
      this.token = token;
      console.log("login_subscribe: ", this.token)
    })
    this.storage.get('user:token').then((token)=>{
      this.token = token;
    })
  }

  public getUserById(id){
    return this.get('/users/' + id);
  }

  public getMe(){
    return this.get('/me', this.token)
  }

  public getMeFarm(){
    return this.get('/me/farm/', this.token);
  }

  public getShopingCart(){
    return this.get('/me/shopping_cart', this.token);
  }

  public getNews(keyword){
    let params = {}
    if(keyword)
      params['keyword'] = keyword;
    console.log("get news api", params)
    return this.get('/news/', null, params);
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
      if(filter.classSelect)
        params['class'] = filter.classSelect
      if(filter.price_below)
        params['price_below'] = filter.price_below
      if(filter.price_above)
        params['price_above'] = filter.price_above
    }
    console.log("get product api", params)
    return this.get('/products', null, params);
  }

  public getProductById(id){
    return this.get('/products/' + id);
  }

  public getRelatedProduct(product_class, id){
    let params = {product_class: product_class, id: id}
    return this.get('/products/related', null, params);
  }



  public postMeLogin(data){
    let type = 'application/x-www-form-urlencoded';
    const body = new HttpParams().set('username', data.username)
                                 .set('password', data.password);

    return this.post('/me/login', body, type, this.token);
  }

  public postProducts(data){
    console.log(data)
    return this.post('/products/', data, this.token)
  }

  public postNews(data){
    let type = 'application/x-www-form-urlencoded';
    const body = new HttpParams().set('datatime', data.datetime)
                                 .set('farm_id', data.farm_id)
                                 .set('title', data.title)
                                 .set('description', data.description)
                                 .set('image_url', data.image_url);
                
    return this.post('/news', body, type, this.token)
  }

  public postShopingCart(data){
    let type = 'application/x-www-form-urlencoded';
    const body = new HttpParams().set('farm_id', data.farm_id)
                                 .set('product_id', data.product_id)
                                 .set('qty', data.qty)
    return this.post('/me/shopping_cart', body, type, this.token)
  }

  public postMeFarmPickup(location){
    let type = 'application/x-www-form-urlencoded';
    const body = new HttpParams().set('location', location)
    return this.post('/me/farm/pickup', body, type, this.token)
  }

  public putMe(data, file){
    var formData: FormData = new FormData();
    if(file)
      formData.append('icon', file, 'icon-' + Date.now() + '.png')
    formData.append('display_name', data.display_name)
    formData.append('address', data.address)
    formData.append('phone_number', data.phone_number)
    
    return this.put('/me', formData, this.token)
  }

  public putMeFarm(data, icon, banner){
    var formData: FormData = new FormData();
    if(icon)
      formData.append('icon', icon, 'icon-' + Date.now() + '.png')
    if(banner)
      formData.append('banner', banner, 'banner-' + Date.now() + '.png')
    formData.append('display_name', data.display_name)
    formData.append('address', data.address)
    formData.append('phone_number', data.phone_number)
    formData.append('about_intro', data.about_intro)
    
    return this.put('/me/farm', formData, this.token)
  }

  public putMeFarmSetting(type, value){
    const body = new HttpParams().set('type', type)
                                 .set('value', value)
    return this.put('/me/farm/setting', body, this.token);
  }

  public putMeFarmPickup(type, value, id){
    const body = new HttpParams().set('type', type)
                                 .set('value', value)
    return this.put('/me/farm/pickup/' + id, body, this.token);
  }

  public deleteMeFavourite(id){
    return this.delete('/me/favourite/' + id, this.token);
  }

  public deleteNews(id){
    return this.delete('/news/' + id, this.token);
  }
}
