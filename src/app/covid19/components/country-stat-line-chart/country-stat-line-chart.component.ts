import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CountryStat } from '../../models/covid19-model';
import { ChartOptions } from '../../models/chart';
import { ApexAxisChartSeries } from 'ng-apexcharts';
import * as _ from 'lodash';

@Component({
  selector: 'app-country-stat-line-chart',
  templateUrl: './country-stat-line-chart.component.html',
  styleUrls: ['./country-stat-line-chart.component.css']
})
export class CountryStatLineChartComponent implements OnInit, OnChanges {
  @Input() Top: number;
  @Input() CountryStats: CountryStat[];
  public ChartOptions: ChartOptions;

  constructor() {

  }
  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.Stats||changes.Top) && this.CountryStats && this.Top) {
      this.SetChart(this.CountryStats, this.Top);
    }
  }

  SetChart(stats: CountryStat[], top: number): void {
    this.ChartOptions = {
      Series: this.GetSeries(stats, top),
      Chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: true
        }
      },
      Stroke: {
        curve: 'smooth'
      },
      Title: {
        text: `前${top}大確診國家趨勢圖`,
        align: 'left'
      },
      Grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      Markers: {
        size: 1
      },
      Xaxis: {
        type: 'datetime',
        categories: this.GetDate(stats),
      },
      Yaxis: {
        title: {
          text: '確診(總)'
        }
      },
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
    const series: ApexAxisChartSeries = [];
    topStats.forEach(item => {
      const obj: any = { name: item.Country.Name, data: [] };
      item.Stats.forEach(element => {
        obj.data.push(element.Confirmed);
      });
      series.push(obj);
    });
    return series;
  }
  GetDate(stats: CountryStat[]): string[] {
    const stat: CountryStat = _.chain(stats).maxBy(o => _.last(o.Stats).Confirmed).value();
    return _.chain(stat.Stats).map(o => o.LastUpdate.toISOString()).value();
  }
}
