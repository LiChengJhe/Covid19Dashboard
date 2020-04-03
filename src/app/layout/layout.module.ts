import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { ViewStartComponent } from './pages/view-start/view-start.component';
import { NavBarComponent } from './components/navs/nav-bar/nav-bar.component';
import { FooterBarComponent } from './components/footers/footer-bar/footer-bar.component';
import { ContentBarComponent } from './components/contents/content-bar/content-bar.component';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Covid19Module } from '../covid19/covid19.module';
@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    Covid19Module,
    FontAwesomeModule
  ],

  declarations: [
    ViewStartComponent,
    NavBarComponent,
    FooterBarComponent,
    ContentBarComponent
  ],
  exports: [
    ViewStartComponent
  ]
})
export class LayoutModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
