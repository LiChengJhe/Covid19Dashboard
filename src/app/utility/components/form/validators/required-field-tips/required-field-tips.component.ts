import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-utility-required-field-tips',
  templateUrl: './required-field-tips.component.html',
  styleUrls: ['./required-field-tips.component.css']
})
export class RequiredFieldTipsComponent implements OnInit {
  @Input() Field: AbstractControl;
  @Input() Fields: AbstractControl[] = [];
  @Input() FormIsSubmitted = true;
  constructor() { }

  ngOnInit() {
  }
  IsVisible(): boolean {

    if (this.Field) {
      return this.FormIsSubmitted && this.Field.enabled && this.Field.invalid;
    }
    if (this.Fields) {
      for (const i of this.Fields) {
        if (this.FormIsSubmitted && i.enabled && i.invalid) {
          return true;
        }
      }
    }
  }

}
