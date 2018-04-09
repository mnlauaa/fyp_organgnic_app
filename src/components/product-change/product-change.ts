import { Component } from '@angular/core';

/**
 * Generated class for the ProductChangeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'product-change',
  templateUrl: 'product-change.html'
})
export class ProductChange {

  title = "Add product"

  constructor() {
    console.log('Hello ProductChangeComponent Component');
  }

}
