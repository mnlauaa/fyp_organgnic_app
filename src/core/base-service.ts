import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { LoadingController } from 'ionic-angular';


export class BaseService {
    protected api_prefix: string = '';
    protected headers: HttpHeaders = new HttpHeaders();

    constructor(
        protected http: HttpClient,
        // private loadingCtrl: LoadingController
    ) {
        this.headers.set('Content-Type', 'application/json');
    }

    public startQueue(promises: Promise<any>[]){
        return Promise.all(promises).then(data => {
            return data;
        }).catch(err => {
            return err;
        });
    }

    protected get(url) {
        url = this.api_prefix + url;
        return new Promise((resolve, reject) => {
            this.http.get(url)
                .subscribe(data => {
                    resolve(data);
                }, err => reject(err));
        });
    }
}