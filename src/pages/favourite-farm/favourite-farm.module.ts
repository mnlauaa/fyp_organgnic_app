import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavouriteFarmPage } from './favourite-farm';

@NgModule({
  declarations: [
    FavouriteFarmPage,
  ],
  imports: [
    IonicPageModule.forChild(FavouriteFarmPage),
  ],
})
export class FavouriteFarmPageModule {}
