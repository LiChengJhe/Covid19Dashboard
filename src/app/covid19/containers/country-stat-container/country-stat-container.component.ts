import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Country, CountryStat, Stat } from '../../models/covid19-model';
import { forkJoin, timer } from 'rxjs';
import * as _ from 'lodash';
import { FormControl, FormGroup } from '@angular/forms';
import { BtnType, IconType, Icon } from 'src/app/utility/models/btn';
import { Covid19SourceService } from '../../services/covid19-source.service';
import { HttpCallbackService } from 'src/app/utility/services/http/http-callback.service';

@Component({
  selector: 'app-country-stat-container',
  templateUrl: './country-stat-container.component.html',
  styleUrls: ['./country-stat-container.component.css']
})
export class CountryStatContainerComponent implements OnInit {
  Countries: Country[];
  SelectedCountry: Country = { Name: 'Taiwan' };
  SelectedCountryStat: CountryStat;
  SelectedHistoricalCountryStats: CountryStat;
  Form: FormGroup;
  BtnType = BtnType;
  Icon = Icon;
  IconType = IconType;
  constructor(
    private covid19SourceService: Covid19SourceService,
    private httpCallback: HttpCallbackService) { }

  ngOnInit(): void {

    this.LoadData(()=>{
      this.SetForm({ Country: 'Taiwan' });
      this.CountryOnChange();
    });

  }

  SetForm(data: any): void {
    this.Form = new FormGroup({
      Country: new FormControl(data ? data.Country : null)
    });
  }

  LoadData(callback?: (params: any) => void): void {
    forkJoin([
      this.covid19SourceService.GetCountries()
    ]
    ).pipe(
      map(([Countries]) => {
        return { Countries};
      })
    ).subscribe((data) => {
      this.Countries = data.Countries;
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
        map(([CountryStat, HistoricalCountryStats]) => {
          return { CountryStat, HistoricalCountryStats };
        })
      ).subscribe((data) => {
        this.SelectedCountryStat = data.CountryStat;
        this.SelectedHistoricalCountryStats = data.HistoricalCountryStats;

      }, this.httpCallback.Error);


    } else {
      this.SelectedCountryStat = null;
    }
  }

}
