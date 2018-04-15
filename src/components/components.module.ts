import { NgModule } from '@angular/core';
import { MyNavbar } from './my-navbar/my-navbar';
import { FilterBox } from './filter-box/filter-box';
import { SortingBox } from './sorting-box/sorting-box';
import { ImageCropper } from './image-cropper/image-cropper';
import { ProductChange } from './product-change/product-change';
import { AddNewsComponent } from './add-news/add-news';
@NgModule({
	declarations: [MyNavbar,
    FilterBox,
    SortingBox,
    ImageCropper,
    ProductChange,
    AddNewsComponent],
	imports: [],
	exports: [MyNavbar,
    FilterBox,
    SortingBox,
    ImageCropper,
    ProductChange,
    AddNewsComponent]
})
export class ComponentsModule {}
