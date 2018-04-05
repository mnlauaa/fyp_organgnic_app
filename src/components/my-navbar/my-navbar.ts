import { Component, Input } from '@angular/core';
import { Platform, NavController, ViewController  } from 'ionic-angular';
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
  @Input() enable_close: boolean = false;
  @Input() enable_menu: boolean = true;
  
  constructor(
    protected platform: Platform,
    protected nav: NavController,
    private view: ViewController
  ) {
    
  }

  openPage() {
    this.nav.push(ShoppingCartPage, {enable_back: true});
  }

  closeView() {
    console.log("hello")
    this.view.dismiss();
  }
}
