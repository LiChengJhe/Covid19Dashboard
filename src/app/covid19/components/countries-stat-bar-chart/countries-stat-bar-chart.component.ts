import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ChartOptions } from '../../models/chart';
import { CountryStat, Stat } from '../../models/covid19-model';
import { ApexAxisChartSeries } from 'ng-apexcharts';
import * as _ from 'lodash';

@Component({
  selector: 'app-countries-stat-bar-chart',
  templateUrl: './countries-stat-bar-chart.component.html',
  styleUrls: ['./countries-stat-bar-chart.component.css']
})
export class CountriesStatBarChartComponent implements OnInit, OnChanges {
  @Input() Top: number;
  @Input() CountryStats: CountryStat[] = [];
  public ChartOptions: ChartOptions;

  constructor() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.Stats || changes.Top) && this.CountryStats && this.Top) {
      this.SetChart(this.CountryStats, this.Top);
    }

  }
  ngOnInit(): void {

  }

  SetChart(stats: CountryStat[], top: number): void {
    this.ChartOptions = {
      Series: this.GetSeries(stats, top),
      Chart: {
        type: 'bar',
        height: 350
      },
      PlotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top'
          }
        }
      },
      DataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff']
        }
      },
      Stroke: {
        show: true,
        width: 1,
        colors: ['#fff'],
      },
      Xaxis: {
        categories: this.GetCountries(stats, top),
        title: {
          text: '確診(總)'     
        }
      },
      Yaxis: {
        title: {
          text: '國家'
        }
      },
      Title: {
        text: `前${top}大確診國家`,
        align: 'left'
      },
      Colors: ['#6aa1e2', '#ff0000', '#5fb500'],
      Legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -10,
        offsetX: -5
      }
    };
  }

  GetSeries(stats: CountryStat[], top: number): ApexAxisChartSeries {
    const topStats: CountryStat[] = _.chain(stats).orderBy(o => _.last(o.Stats).Confirmed).reverse().take(top).value();

    const confirmed = { name: '確診', data: [] };
    const deaths = { name: '死亡', data: [] };
    const recovered = { name: '治癒', data: [] };
    topStats.forEach(item => {
      const last: Stat = _.last(item.Stats);
      confirmed.data.push(last.Confirmed);
      deaths.data.push(last.Deaths);
      recovered.data.push(last.Recovered);
    });
    return [confirmed];
  }
  GetCountries(stats: CountryStat[], top: number): string[] {

    return _.chain(stats).orderBy(o => _.last(o.Stats).Confirmed).reverse().take(top).map(o => o.Country.Name).value();
  }
}
