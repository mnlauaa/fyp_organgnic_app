import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SellerStatPage } from './seller-stat';

@NgModule({
  declarations: [
    SellerStatPage,
  ],
  imports: [
    IonicPageModule.forChild(SellerStatPage),
  ],
})
export class SellerStatPageModule {}
