import { Component, OnInit } from '@angular/core';
import { Covid19SourceService } from '../../services/covid19-source.service';
import { Observable, forkJoin } from 'rxjs';
import { Country, Stat, CountryStat } from '../../models/covid19-model';
import { FormGroup, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { HttpCallbackService } from 'src/app/utility/services/http/http-callback.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  GlobalHistoricalStats: Stat[];
  Countries: Country[];
  GlobalStats: Stat[];
  CountryStats: CountryStat[];
  SelectedCountry: Country = { Name: 'Taiwan' };
  SelectedCountryStat: CountryStat;
  SelectedHistoricalCountryStats: CountryStat;
  Form: FormGroup;
  constructor(
    private covid19SourceService: Covid19SourceService,
    private httpCallback: HttpCallbackService) { }

  ngOnInit(): void {

    this.LoadData();
    this.SetForm({});
  }

  SetForm(data: any): void {
    this.Form = new FormGroup({
      Country: new FormControl(data ? data.Country : null)
    });
  }

  LoadData(callback?: (params: any) => void): void {
    forkJoin([
      this.covid19SourceService.GetCountries(),
      this.covid19SourceService.GetGlobalStats(),
      this.covid19SourceService.GetGlobalHistoricalStats(),
      this.covid19SourceService.GetCountryStats()
    ]
    ).pipe(
      map(([Countries, GlobalStats, GlobalHistoricalStats, CountryStats]) => {
        return { Countries, GlobalStats, GlobalHistoricalStats, CountryStats };
      })
    ).subscribe((data) => {
      this.Countries = data.Countries;
      this.GlobalStats = data.GlobalStats;
      this.GlobalHistoricalStats = data.GlobalHistoricalStats;
      console.log(this.GlobalHistoricalStats);
      this.CountryStats = data.CountryStats;
      if (callback) {
        callback(data);
      }
    }, this.httpCallback.Error);
  }

  CountryOnChange(): void {
    const country: Country = _.find(this.Countries, (o) => o.Name == this.Form.value.Country);
    if (country) {

      forkJoin([
        this.covid19SourceService.GetCountryStat(country),
        this.covid19SourceService.GetHistoricalCountryStatsByCountry(country)
      ]
      ).pipe(
        map(([CountryStat,HistoricalCountryStats]) => {
          return { CountryStat,HistoricalCountryStats };
        })
      ).subscribe((data) => {
        this.SelectedCountryStat = data.CountryStat;
        this. SelectedHistoricalCountryStats= data.HistoricalCountryStats ;

      }, this.httpCallback.Error);


    } else {
      this.SelectedCountryStat = null;
    }
  }

}
