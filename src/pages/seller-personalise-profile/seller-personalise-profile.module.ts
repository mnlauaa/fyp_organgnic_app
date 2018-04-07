import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SellerPersonaliseProfilePage } from './seller-personalise-profile';

@NgModule({
  declarations: [
    SellerPersonaliseProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(SellerPersonaliseProfilePage),
  ],
})
export class SellerPersonaliseProfilePageModule {}
