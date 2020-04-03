import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import * as _ from 'lodash';
import { TitleProp, BtnProp, ConfirmBox as ConfirmBoxSettings } from './models/confirm-box';
import { Icon, BtnType } from '../../models/btn';



@Component({
  selector: 'app-utility-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.css']
})
export class ConfirmBoxComponent implements OnInit {
  Title: TitleProp = { Text: 'Confirmation', NgClass: ['modal-header', 'text-white', 'bg-info'] };
  Message: string;
  PrimaryBtn: BtnProp;
  SecondaryBtn: BtnProp;
  Icon = Icon;
  @ViewChild('Modal', { static: true }) Modal: ElementRef;
  constructor() { }

  ngOnInit() {


  }

  SetSettings(settings: ConfirmBoxSettings): void {
    if (settings.Title) {
      this.Title.Text = settings.Title.Text;
      if (settings.Title.NgClass) {
        this.Title.NgClass = settings.Title.NgClass;
      } else {
        this.Title.NgClass = ['modal-header', 'text-white', 'bg-info'];
      }
    }
    if (settings.Message) {
      this.Message = settings.Message;
    }
    if (settings.PrimaryBtn) {
      this.PrimaryBtn = _.merge({}, settings.PrimaryBtn);
    } else {
      this.PrimaryBtn = null;
    }
    if (settings.SecondaryBtn) {
      this.SecondaryBtn = _.merge({}, settings.SecondaryBtn);
    } else {
      this.SecondaryBtn = null;
    }

  }

  Show(): void {
    $(this.Modal.nativeElement).modal(BtnType.Show.toLowerCase() as any);
  }
  Hide(): void {
    $(this.Modal.nativeElement).modal(BtnType.Hide.toLowerCase() as any);
  }
}
