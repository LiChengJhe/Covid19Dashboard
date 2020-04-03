import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { BtnType, IconType, Icon } from 'src/app/utility/models/btn';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  BtnType = BtnType;
  Icon = Icon;
  IconType = IconType;
  constructor() { }

  ngOnInit(): void {

  
  }


}
