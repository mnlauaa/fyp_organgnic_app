import { Component, Input } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';

@Component({
  selector: 'my-navbar',
  templateUrl: 'my-navbar.html'
})
export class MyNavbar {

  @Input() title: string;
  @Input() logo_url: string;
  constructor(
    protected platform: Platform,
    protected nav: NavController
  ) {
  }

}
