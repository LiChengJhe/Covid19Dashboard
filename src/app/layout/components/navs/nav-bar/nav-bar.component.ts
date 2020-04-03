import { Component, OnInit, OnDestroy } from '@angular/core';
import { BtnType, Icon, IconType } from 'src/app/utility/models/btn';

import { Protocol } from 'src/app/utility/models/url';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  Icon = Icon;
  BtnType = BtnType;
  IconType = IconType;

  constructor() {
  }
  ngOnDestroy(): void {
  }
  ngOnInit() {

  }



}
