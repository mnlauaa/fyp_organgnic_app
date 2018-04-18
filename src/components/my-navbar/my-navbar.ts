import { Component, Input } from '@angular/core';
import { Platform, NavController, ViewController, Events  } from 'ionic-angular';
import { ShoppingCartPage } from '../../pages/shopping-cart/shopping-cart';
import { Storage } from '@ionic/storage';
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
  user_info: any;
  constructor(
    private ev: Events,
    private storage: Storage,
    protected platform: Platform,
    protected nav: NavController,
    private view: ViewController
  ) {
    this.ev.subscribe('user_info', (user_info) => {
      if(user_info){
        this.user_info = user_info;
        if(user_info.identity == 1)
          this.enable_shopping_button = false;
      }
    });

    this.storage.get('user_info').then((user_info)=>{
			//push info to ionic event
			if(user_info){
        this.user_info = user_info;
        if(user_info.identity == 1)
        this.enable_shopping_button = false;
      }
		})
    
  }

  openPage() {
    this.nav.push(ShoppingCartPage, {
      enable_back: true,
      user_info: this.user_info
    });
  }

  closeView() {
    console.log("hello")
    this.view.dismiss();
  }
}
