import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';


export class BaseService {
    protected api_prefix: string = '';
    constructor(
        protected http: HttpClient,
        protected loadingCtrl: LoadingController
    ) {
    }

    public startQueue(promises: Promise<any>[]): Promise<any> {
        let loading = this.loadingCtrl.create();
        return loading.present().then(()=>{
            return Promise.all(promises).then(data => {
                loading.dismiss();
                return data;
            })  
        }).catch((err)=>{
            loading.dismiss();
            return Promise.reject(err);
        })
    }

    // GET request
    protected get(url, auth = null, params = null): Promise<any> {
        url = this.api_prefix + url;
        return new Promise((resolve, reject) => {
            this.http.get(url, {
                headers: new HttpHeaders().set('Authorization', 'jwt ' + auth),  
                params: params
            })
            .subscribe(data => {
                resolve(data);
            }, err => reject(err));
        });
    }

    // POST request normal
    protected post(url, body: HttpParams = null, type = null, auth = null): Promise<any> {
        url = this.api_prefix + url;
        return new Promise((resolve, reject) => {
            this.http.post(url, body.toString(), {
                headers: new HttpHeaders().set('Content-Type', type).set('Authorization', 'jwt ' + auth)
            })
            .subscribe(data => {
                resolve(data);
            }, err => reject(err));
        });
    }

    protected post_file(url, formData: FormData = null, auth = null): Promise<any> {
        url = this.api_prefix + url;
        return new Promise((resolve, reject) => {
            this.http.post(url, formData, {
                headers: new HttpHeaders().set('Authorization', 'jwt ' + auth)
            })
            .subscribe(data => {
                resolve(data);
            }, err => reject(err));
        });
    }

    // PUT reqest normal
    protected put_normal(url, body: HttpParams = null, type = null, auth = null): Promise<any> {
        url = this.api_prefix + url;
        return new Promise((resolve, reject) => {
            this.http.put(url, body.toString(), {
                headers: new HttpHeaders().set('Content-Type', type).set('Authorization', 'jwt ' + auth)
            })
            .subscribe(data => {
                resolve(data);
            }, err => reject(err));
        });
    }
    
    // PUT request(with file)
    protected put(url, formData: FormData = null, auth = null): Promise<any>{
        url = this.api_prefix + url;
        return new Promise((resolve, reject) => {
            this.http.put(url, formData, {
                headers: new HttpHeaders().set('Authorization', 'jwt ' + auth)
            })
            .subscribe(data => {
                resolve(data);
            }, err => reject(err));
        });
    }

    // DELETE request
    protected delete(url, auth = null, params = null): Promise<any> {
        url = this.api_prefix + url;
        return new Promise((resolve, reject) => {
            this.http.delete(url, {
                headers: new HttpHeaders().set('Authorization', 'jwt ' + auth),  
                params: params
            })
            .subscribe(data => {
                resolve(data);
            }, err => reject(err));
        });
    }
}