import { NgModule } from '@angular/core';
import { MyNavbar } from './my-navbar/my-navbar';
import { FilterBox } from './filter-box/filter-box';
import { SortingBox } from './sorting-box/sorting-box';
@NgModule({
	declarations: [MyNavbar,
    FilterBox,
    SortingBox],
	imports: [],
	exports: [MyNavbar,
    FilterBox,
    SortingBox]
})
export class ComponentsModule {}
