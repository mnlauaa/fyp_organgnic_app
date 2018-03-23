import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { LoadingController } from 'ionic-angular';


export class BaseService {
    protected api_prefix: string = '';


    constructor(
        protected http: HttpClient,
        // private loadingCtrl: LoadingController
    ) {
    }

    public startQueue(promises: Promise<any>[]): Promise<any> {
        return Promise.all(promises).then(data => {
            return data;
        }).catch(err => {
            console.log(err.status)
            return Promise.reject(err);
        });
    }

    // GET request
    protected get(url): Promise<any> {
        url = this.api_prefix + url;
        return new Promise((resolve, reject) => {
            this.http.get(url)
                .subscribe(data => {
                    resolve(data);
                }, err => reject(err));
        });
    }

    // POST request, x-www-form-urlencoded
    protected post_normal(url, body: HttpParams = null, params: HttpParams = null): Promise<any> {
        url = this.api_prefix + url;
        return new Promise((resolve, reject) => {
            this.http.post(url, body.toString(), {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            })
            .subscribe(data => {
                resolve(data);
            }, err => reject(err));
        });
    }
}