import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'photo-popup',
  templateUrl: 'photo-popup.html'
})
export class PhotoPopup {

  photo_url: any;

  constructor(
    protected view: ViewController,
    private params: NavParams,
  ) {
    this.photo_url = this.params.get('photo_url');
  }

  close() {
		this.view.dismiss();
	}

}
