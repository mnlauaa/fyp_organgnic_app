import { HttpClient } from '@angular/common/http';
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

}
