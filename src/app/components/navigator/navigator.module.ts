import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { NavigatorCreatorComponent } from './components/creator/creator.component';
import { NavigatorDoorbellComponent } from './components/doorbell/doorbell.component';
import { NavigatorMainComponent } from './components/main/main.component';
import { NavigatorPasswordComponent } from './components/password/password.component';
import { NavigatorSearchComponent } from './components/search/search.component';
import { NavigatorSearchItemComponent } from './components/searchitem/searchitem.component';
import { NavigatorSearchResultComponent } from './components/searchresult/searchresult.component';
import { NavigatorService } from './services/navigator.service';
import { NavigatorSliderComponent } from './components/slider/slider.component'

@NgModule({
    imports: [
        SharedModule
    ],
    exports: [
        NavigatorCreatorComponent,
        NavigatorDoorbellComponent,
        NavigatorMainComponent,
        NavigatorPasswordComponent,
        NavigatorSearchComponent,
        NavigatorSearchItemComponent,
        NavigatorSearchResultComponent,
        NavigatorSliderComponent
    ],
    providers: [
        NavigatorService
    ],
    declarations: [
        NavigatorCreatorComponent,
        NavigatorDoorbellComponent,
        NavigatorMainComponent,
        NavigatorPasswordComponent,
        NavigatorSearchComponent,
        NavigatorSearchItemComponent,
        NavigatorSearchResultComponent,
        NavigatorSliderComponent
    ],
    entryComponents: [ NavigatorCreatorComponent, NavigatorDoorbellComponent, NavigatorPasswordComponent ]
})
export class NavigatorModule 
{}