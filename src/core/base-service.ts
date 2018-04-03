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
        loading.present().then(()=>{})
        return Promise.all(promises).then(data => {
            loading.dismiss();
            return data;
        }, err => {
            console.log(err.status)
            loading.dismiss()
            return Promise.reject(err);
        });   
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

    // POST request, x-www-form-urlencoded
    protected post_normal(url, body: HttpParams = null, type = null, auth = null): Promise<any> {
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
}