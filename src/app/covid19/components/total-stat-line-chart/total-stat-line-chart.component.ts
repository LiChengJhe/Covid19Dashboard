import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Stat } from '../../models/covid19-model';
import { ChartOptions } from '../../models/chart';
import { ApexAxisChartSeries } from 'ng-apexcharts';



@Component({
  selector: 'app-total-stat-line-chart',
  templateUrl: './total-stat-line-chart.component.html',
  styleUrls: ['./total-stat-line-chart.component.css']
})
export class TotalStatLineChartComponent implements OnInit, OnChanges {

  @Input() Stats: Stat[];
  public ChartOptions: ChartOptions;

  constructor() {

  }
  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Stats && this.Stats) {
      this.SetChart(this.Stats);
    }
  }

  SetChart(stats: Stat[]): void {
    this.ChartOptions = {
      Series: this.GetSeries(stats),
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
        text: '趨勢圖(確診/死亡/治癒)',
        align: 'left'
      },
      Colors: ['#6aa1e2','#ff0000','#5fb500'],
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
        title: {
          text: '日期'
        }
      },
      Yaxis: {
        title: {
          text: '確診/死亡/治癒(總)'
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
  GetSeries(stats: Stat[]): ApexAxisChartSeries {
    const confirmed = { name: '確診', data: [] };
    const deaths = { name: '死亡', data: [] };
    const recovered = { name: '治癒', data: [] };
    stats.forEach(item => {
      confirmed.data.push(item.Confirmed);
      deaths.data.push(item.Deaths);
      recovered.data.push(item.Recovered);
    });
    return [confirmed, deaths, recovered];
  }
  GetDate(stats: Stat[]): string[] {
    const confirmedDate: string[] = [];
    stats.forEach(item => {
      confirmedDate.push(item.LastUpdate.toISOString());
    });
    return  confirmedDate;
  }

}
