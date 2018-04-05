import { NgModule } from '@angular/core';
import { MyNavbar } from './my-navbar/my-navbar';
import { FilterBox } from './filter-box/filter-box';
import { SortingBox } from './sorting-box/sorting-box';
import { ImageCropper } from './image-cropper/image-cropper';
@NgModule({
	declarations: [MyNavbar,
    FilterBox,
    SortingBox,
    ImageCropper],
	imports: [],
	exports: [MyNavbar,
    FilterBox,
    SortingBox,
    ImageCropper]
})
export class ComponentsModule {}
