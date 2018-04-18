import { NgModule } from '@angular/core';
import { MyNavbar } from './my-navbar/my-navbar';
import { FilterBox } from './filter-box/filter-box';
import { SortingBox } from './sorting-box/sorting-box';
import { ImageCropper } from './image-cropper/image-cropper';
import { ProductChange } from './product-change/product-change';
import { AddNewsComponent } from './add-news/add-news';
import { PhotoPopup } from './photo-popup/photo-popup';
import { NewsChangeComponent } from './news-change/news-change';
import { EditOrder } from './edit-order/edit-order';
import { FarmHouse } from './farm-house/farm-house';
@NgModule({
	declarations: [MyNavbar,
    FilterBox,
    SortingBox,
    ImageCropper,
    ProductChange,
    AddNewsComponent,
    PhotoPopup,
    NewsChangeComponent,
    EditOrder,
    FarmHouse],
    
	imports: [],
	exports: [MyNavbar,
    FilterBox,
    SortingBox,
    ImageCropper,
    ProductChange,
    AddNewsComponent,
    PhotoPopup,
    NewsChangeComponent,
    EditOrder,
    FarmHouse]
})
export class ComponentsModule {}
