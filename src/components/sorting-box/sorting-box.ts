import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SortingBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sorting-box',
  templateUrl: 'sorting-box.html'
})
export class SortingBox {
  sorting_option: any;
  selectItem: any;
  parent: any;

  constructor(
    private navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.sorting_option = [
      { name: "Alphabetical", id: 0 },
      { name: "Relevance", id: 1 },
      { name: "Ascending Price", id: 2 },
      { name: "Descending Price", id: 3 },
      { name: "Rating", id: 4 },
      { name: "Newest Entry", id: 5 },
    ]

    this.parent = navParams.data.parent;
    this.selectItem = navParams.data.callback;

    viewCtrl.onWillDismiss(()=>{
      navParams.data.sortingBoxWillClose();
    })
  }

}
