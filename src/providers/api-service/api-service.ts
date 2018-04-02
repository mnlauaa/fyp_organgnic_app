import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../core/base-service';
import { Events, LoadingController } from 'ionic-angular';

@Injectable()
export class ApiService extends BaseService{
  protected api_prefix: string = 'http://localhost:3000';
  private token = null;
  

  constructor(
    public http: HttpClient,
    private ev: Events,
    protected loadingCtrl: LoadingController
  ) {
    super(http, loadingCtrl);
    console.log('Hello ApiService');
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

  public getNews(){
    return this.get('/news');
  }

  public getProducts(sorting, keyword, filter){
    let params = {sorting: sorting}
    return this.get('/products', null, params);
  }


  public postMeLogin(data){
    let type = 'application/x-www-form-urlencoded';

    const body = new HttpParams().set('username', data.username)
                                 .set('password', data.password);

    return this.post_normal('/me/login', body, type, this.token).then((data)=>{
      this.ev.publish('user:token', data.token,);
      console.log('login: ',data)
      return data;
    })
  }

}
