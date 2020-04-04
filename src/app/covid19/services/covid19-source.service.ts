import { Injectable } from '@angular/core';
import { UrlResource } from 'src/app/utility/models/url';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { Stat, CountryStat, Country } from '../models/covid19-model';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class Covid19SourceService {

  private _Covid19MathdroApi: UrlResource = new UrlResource(environment.Resource.Covid19MathdroApi);
  private _CoronaNinjaApi: UrlResource = new UrlResource(environment.Resource.CoronaNinjaApi);

  constructor(private httpClient: HttpClient) {
  }



  GetCountries(): Observable<Country[]> {
    const url: string = this._Covid19MathdroApi.GetURL(`countries`);
    return this.httpClient.get(url).pipe(
      // tap((o) => console.log(o)),
      map((list: any) => {
        const countries: Country[] = [];
        list.countries.forEach(element => {
          countries.push({
            Name: _.replace(element.name, '*', ''),
            ISO2: element.iso2,
            ISO3: element.iso3,
          });
        });
        return countries;
      }));
  }


  GetHistoricalCountryStats(): Observable<CountryStat[]> {
    const url: string = this._CoronaNinjaApi.GetURL(`v2/historical`);
    return this.httpClient.get(url).pipe(
      // tap((o) => console.log(o)),
      map((list: any) => {

        let countryStatsMap: { [key: string]: CountryStat } = {};
        list.forEach(element => {

          countryStatsMap[element.country] = {
            Country: { Name: element.country },
            Stats: []
          };

          // tslint:disable-next-line: forin
          for (const item in element.timeline.cases) {
            countryStatsMap[element.country].Stats.push({
              Confirmed: element.timeline.cases[item],
              Recovered: element.timeline.recovered[item],
              Deaths: element.timeline.deaths[item],
              LastUpdate: new Date(item)
            });
          }

        });

        let countryStats: CountryStat[] = _.values(countryStatsMap);
        countryStatsMap = {};

        countryStats.forEach(element => {
          const queryKey = `${element.Country.Name}`;
          if (countryStatsMap[queryKey]) {

            countryStatsMap[queryKey].Stats.forEach((item, index) => {
              item.Confirmed += element.Stats[index].Confirmed;
              item.Deaths += element.Stats[index].Deaths;
              item.Recovered += element.Stats[index].Recovered;
            });
          } else {
            countryStatsMap[queryKey] = element;
          }
        });

        countryStats = _.values(countryStatsMap);

        countryStats.forEach(element => {
          element.Stats.forEach(item => {
            item.RecoveredRate = _.round((item.Recovered / item.Confirmed) * 100, 2),
              item.DeathRate = _.round((item.Deaths / item.Confirmed) * 100, 2)
          });
        });


        return countryStats;
      }));
  }

  GetHistoricalCountryStatsByCountry(country: Country): Observable<CountryStat> {
    const url: string = this._CoronaNinjaApi.GetURL(`v2/historical/${country.ISO3}`);
    return this.httpClient.get(url).pipe(
      // tap((o) => console.log(o)),
      map((data: any) => {
        const countryStat: CountryStat = { Country: { Name: data.country }, Stats: [] };

        // tslint:disable-next-line: forin
        for (const item in data.timeline.cases) {
          const confirmed = data.timeline.cases[item];
          const recovered = data.timeline.recovered[item];
          const deaths = data.timeline.deaths[item];
          countryStat.Stats.push({
            Confirmed: confirmed,
            Recovered: recovered,
            Deaths: deaths,
            RecoveredRate: _.round((recovered / confirmed) * 100, 2),
            DeathRate: _.round((deaths / confirmed) * 100, 2),
            LastUpdate: new Date(item)
          });
        }


        return countryStat;
      }));
  }

  GetGlobalHistoricalStats(): Observable<Stat[]> {
    const url: string = this._CoronaNinjaApi.GetURL(`v2/historical/all`);
    return this.httpClient.get(url).pipe(
      // tap((o) => console.log(o)),
      map((list: any) => {
        const stats: Stat[] = [];
        // tslint:disable-next-line: forin
        for (const item in list.cases) {
          stats.push({
            Confirmed: list.cases[item],
            Recovered: list.recovered[item],
            Deaths: list.deaths[item],
            RecoveredRate: _.round((list.recovered[item] / list.cases[item]) * 100, 2),
            DeathRate: _.round((list.deaths[item] / list.cases[item]) * 100, 2),
            LastUpdate: new Date(item)
          });
        }

        return stats;
      }));
  }


  GetCountryStat(country: Country): Observable<CountryStat> {
    const url: string = this._CoronaNinjaApi.GetURL(`countries/${country.ISO3}`);
    return this.httpClient.get(url).pipe(
      // tap((o) => console.log(o)),
      map((item: any) => ({
        Country: {
          Name: item.country,
          ISO2: item.countryInfo.iso2,
          ISO3: item.countryInfo.iso3
        },
        Stats: [
          {
            Confirmed: item.todayCases,
            Deaths: item.todayDeaths
          },
          {
            Confirmed: item.cases,
            Recovered: item.recovered,
            Deaths: item.deaths,
            Critical: item.critical,
            RecoveredRate: _.round((item.recovered / item.cases) * 100, 2),
            DeathRate: _.round((item.deaths / item.cases) * 100, 2),
            CriticalRate: _.round((item.critical / item.cases) * 100, 2),
            MildRate: _.round(100 - (item.critical / item.cases) * 100, 2),
            LastUpdate: new Date(item.updated)
          }
        ]
      })));
  }


  GetCountryStats(): Observable<CountryStat[]> {
    const url: string = this._CoronaNinjaApi.GetURL(`countries`);
    return this.httpClient.get(url).pipe(
      // tap((o) => console.log(o)),
      map((list: any) =>
        list.map(item =>
          ({
            Country: {
              Name: item.country,
              ISO2: item.countryInfo.iso2,
              ISO3: item.countryInfo.iso3
            },
            Stats: [
              {
                Confirmed: item.todayCases,
                Deaths: item.todayDeaths
              }, {
                Confirmed: item.cases,
                Recovered: item.recovered,
                Deaths: item.deaths,
                Critical: item.critical,
                RecoveredRate: _.round((item.recovered / item.cases) * 100, 2),
                DeathRate: _.round((item.deaths / item.cases) * 100, 2),
                CriticalRate: _.round((item.critical / item.cases) * 100, 2),
                MildRate: _.round(100 - (item.critical / item.cases) * 100, 2),
                LastUpdate: new Date(item.updated)
              }]

          })))
    );
  }




}
