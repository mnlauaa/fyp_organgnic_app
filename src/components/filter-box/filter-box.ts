import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FilterBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'filter-box',
  templateUrl: 'filter-box.html'
})
export class FilterBox {
  constructor(
    private navParams: NavParams,
    public viewCtrl: ViewController
  ){
    viewCtrl.onWillDismiss(()=>{
      navParams.data.filterBoxWillClose();
    })
  }
}
