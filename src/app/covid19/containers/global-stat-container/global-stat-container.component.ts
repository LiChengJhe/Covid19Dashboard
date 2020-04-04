import { Component, OnInit } from '@angular/core';
import { forkJoin, timer } from 'rxjs';
import * as _ from 'lodash';
import { Country, CountryStat, Stat } from '../../models/covid19-model';
import { FormGroup, FormControl } from '@angular/forms';
import { Covid19SourceService } from '../../services/covid19-source.service';
import { HttpCallbackService } from 'src/app/utility/services/http/http-callback.service';
import { IconType, BtnType, Icon } from 'src/app/utility/models/btn';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-global-stat-container',
  templateUrl: './global-stat-container.component.html',
  styleUrls: ['./global-stat-container.component.css']
})
export class GlobalStatContainerComponent implements OnInit {

  GlobalHistoricalStats: Stat[];
  GlobalStats: Stat[];
  CountryStats: CountryStat[];
  HistoricalCountryStats: CountryStat[];
  Form: FormGroup;
  BtnType = BtnType;
  Icon = Icon;
  IconType = IconType;
  constructor(
    private covid19SourceService: Covid19SourceService,
    private httpCallback: HttpCallbackService) { }

  ngOnInit(): void {
    this.LoadData();
  }

  SetForm(data: any): void {
    this.Form = new FormGroup({
      Country: new FormControl(data ? data.Country : null)
    });
  }

  LoadData(callback?: (params: any) => void): void {
    forkJoin([
      this.covid19SourceService.GetGlobalHistoricalStats(),
      this.covid19SourceService.GetCountryStats(),
      this.covid19SourceService.GetHistoricalCountryStats(),
    ]
    ).pipe(
      map(([  GlobalHistoricalStats, CountryStats,HistoricalCountryStats]) => {
        return {  GlobalHistoricalStats, CountryStats ,HistoricalCountryStats};
      })
    ).subscribe((data) => {
      this.GlobalStats = _.first(data.CountryStats).Stats;
      console.log(      this.GlobalStats);
      this.GlobalHistoricalStats = data.GlobalHistoricalStats;
      this.CountryStats = _.tail(data.CountryStats);
      console.log(      this.CountryStats);
      this.HistoricalCountryStats = data.HistoricalCountryStats;
      if (callback) {
        callback(data);
      }
    }, this.httpCallback.Error);
  }

}
