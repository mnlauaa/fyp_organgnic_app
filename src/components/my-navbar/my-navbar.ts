import { Component, Input } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { ShoppingCartPage } from '../../pages/shopping-cart/shopping-cart';
@Component({
  selector: 'my-navbar',
  templateUrl: 'my-navbar.html'
})
export class MyNavbar {

  @Input() title: string;
  @Input() logo_url: string;
  @Input() enable_shopping_button: boolean = true;
  @Input() enable_back: boolean = false;
  
  constructor(
    protected platform: Platform,
    protected nav: NavController
  ) {
    
  }

  openPage() {
    this.nav.push(ShoppingCartPage, {enable_back: true});
    }
}
