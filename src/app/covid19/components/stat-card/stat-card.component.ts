import { Component, OnInit, Input } from '@angular/core';
import {  CountryStat, Stat } from '../../models/covid19-model';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.css']
})
export class StatCardComponent implements OnInit {
  @Input() Stat: Stat;

  constructor() { }

  ngOnInit(): void {
  }

}
