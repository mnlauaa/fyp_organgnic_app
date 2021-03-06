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

  public getNewsById(id){
    return this.get('news/' + id, this.token);
  }

  public getFarms(){
    return this.get('/users/farms');
  }

  public getFarmisFavorite(id){
    return this.get('/users/' + id + '/farms/isFavourite', this.token);
  }

  public getMeUnRead(){
    return this.get('/chats/unRead', this.token);
  }

  public getFarmsNews(id){
    return this.get('/news/farm/' + id);
  }

  public getFarmsById(id){
    return this.get('/users/' + id + '/farms');
  }

  public getMyFavourite(){
    return this.get('/me/favourite', this.token);
  }

  public getMyDebt(){
    return this.get('/me/debt', this.token);
  }

  public getMyOrder(){
    return this.get('/me/order', this.token);
  }

  public getMyChat(){
    return this.get('/me/chat', this.token);
  }
  
  public getTopSaleById(id){
    return this.get('/products/stat/' +id ,this.token);
  }

  public getProducts(sorting, keyword=null, filter=null){
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
      if(filter.special)
        params['special'] = filter.special
    }
    console.log("get product api", params)
    return this.get('/products', null, params);
  }

  public getProductById(id){
    return this.get('/products/' + id);
  }

  public getChatById(id){
    return this.get('/chats/' + id, this.token);
  }

  public getRelatedProduct(product_class, id){
    let params = {product_class: product_class, id: id}
    return this.get('/products/related', null, params);
  }

  public getBuyerOrdwes(){
    return this.get('/orders/buyer', this.token);
  }

  public getSellerOrdwes(){
    return this.get('/orders/seller', this.token);
  }

  public getOrderById(id){
    return this.get('/orders/' + id, this.token);
  }

  public getFarmReviews(id){
    return this.get('/users/' + id + '/farms/reviews');
  }

  public getAllCoupon(){
    return this.get('/users/coupon', this.token);
  }
  
  public getOrderPerDayById(id){
    return this.get('/orders/stat/day/' + id, this.token);
  }

  public getOrderPerWeekById(id){
    return this.get('/orders/stat/week/' + id, this.token);
  }

  public getOrderPerMonthById(id){
    return this.get('/orders/stat/monnth/' + id, this.token);
  }

  public postMeLogin(data){
    let type = 'application/x-www-form-urlencoded';
    const body = new HttpParams().set('username', data.username)
                                 .set('password', data.password);

    return this.post('/me/login', body, type, this.token);
  }

  public postMyFavourite(id){
    let type = 'application/x-www-form-urlencoded';
    const body = new HttpParams()
    return this.post('/me/favourite/' + id, body, type, this.token);
  }

  public postMeLogout(){
    let type = 'application/x-www-form-urlencoded';
    const body = new HttpParams()
    return this.post('/me/logout', body, type, this.token);
  }

  public postProducts(data){
    return this.post_file('/products', data, this.token)
  }

  public postNews(data){
    return this.post_file('/news', data, this.token)
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

  public postSignIn(data){
    let type = 'application/x-www-form-urlencoded';
    const body = new HttpParams().set('username', data.username)
                                 .set('password', data.password)
                                 .set('display_name', data.display_name)
                                 .set('phone_number', data.phone)
                                 .set('address', data.address)
    return this.post('/me', body, type, this.token)
  }

  public postTransition(data, id){
    let type = 'application/x-www-form-urlencoded';
    return this.post('/orders/' + id + '/translation', data, type, this.token)
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

  public postFarmReviews(farm_id, comment){
    let type = 'application/x-www-form-urlencoded';
    const body = new HttpParams().set('comment', comment)
    return this.post('/users/' + farm_id + '/farms/reviews', body, type, this.token)
  }

  public postCoupon(buyer_id, amount){
    let type = 'application/x-www-form-urlencoded';
    const body = new HttpParams().set('buyer_id', buyer_id)
                                 .set('amount', amount)
    return this.post('/users/coupon', body, type, this.token)
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

  public putProducts(data, id){
    return this.put('/products/' + id, data, this.token)
  }

  public putOrder(data, id){
    return this.put('/orders/' + id, data, this.token)
  }

  public putTransition(data, id){
    return this.put('/orders/translation/' + id, data, this.token)
  }
  
  public putNews(data, id){
    return this.put('/news/' + id, data, this.token)
  }

  public deleteMeFavourite(id){
    return this.delete('/me/favourite/' + id, this.token);
  }

  public deleteNews(id){
    return this.delete('/news/' + id, this.token);
  }

  public deleteOrder(id){
    return this.delete('/orders/' + id, this.token);
  }

  public deleteTransition(id){
    return this.delete('/orders/translation/' + id, this.token);
  }
}
