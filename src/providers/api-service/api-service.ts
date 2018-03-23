import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../core/base-service';

@Injectable()
export class ApiService extends BaseService{
  protected api_prefix: string = 'http://localhost:3000';

  constructor(public http: HttpClient) {
    super(http);
    console.log('Hello ApiService');
  }

  public getUserById(id){
    return this.get('/users/'+id);
  }

  public getMe(){
    return this.get('/me')
  }

  public postMeLogin(data){
    const body = new HttpParams()
                      .set('username', data.username)
                      .set('password', data.password);
    return this.post_normal('/me/login', body)
  }

}
