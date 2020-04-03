import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityRoutingModule } from './utility-routing.module';
import { ConfirmBoxComponent } from './components/confirm-box/confirm-box.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { RequiredFieldTipsComponent } from './components/form/validators/required-field-tips/required-field-tips.component';
import { ElementPipe } from './pipes/element.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ValuesPipe } from './pipes/values.pipe';
import { KeysPipe } from './pipes/keys.pipe';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { LoadingPipe } from './pipes/loading.pipe';
import { SymbolNumberPipe } from './pipes/symbol-number.pipe';
@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    UtilityRoutingModule,
    FontAwesomeModule,
  ],
  declarations: [
    ConfirmBoxComponent,
    RequiredFieldTipsComponent,
    ReversePipe,
    ElementPipe,
    ValuesPipe,
    KeysPipe,
    LoadingPipe,
    SymbolNumberPipe
  ],
  exports: [
    ConfirmBoxComponent,
    RequiredFieldTipsComponent,
    ReversePipe,
    ElementPipe,
    ValuesPipe,
    KeysPipe,
    LoadingPipe,
    SymbolNumberPipe
  ]
})
export class UtilityModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
