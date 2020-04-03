import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GetFormattedTimeZone } from 'src/app/utility/models/date-time';
import { TableCol } from 'src/app/utility/models/table';
import { BrowserService } from 'src/app/utility/services/ui/browser.service';
import { HttpCallbackService } from 'src/app/utility/services/http/http-callback.service';
import { CountryStat, Stat } from '../../models/covid19-model';
import { BtnType, Icon, IconType } from 'src/app/utility/models/btn';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

export class StatTable {
  Country?: string;
  TodayConfirmed?: number;
  TodayRecovered?: number;
  TodayDeaths?: number;
  TotalConfirmed?: number;
  TotalRecovered?: number;
  TotalDeaths?: number;
  DeathRate?: number;
  RecoveredRate?: number;
  CriticalRate?: number;
  MildRate?: number;
}


@Component({
  selector: 'app-stat-table',
  templateUrl: './stat-table.component.html',
  styleUrls: ['./stat-table.component.css']
})
export class StatTableComponent implements OnInit, OnChanges {
  @Input() CountryStats: CountryStat[] = [];
  TableData: StatTable[] = [];
  TableSelectedRow: StatTable;
  TableCols: TableCol[] = [];
  TableFilterCols: string[] = [];
  FormattedTimeZone = GetFormattedTimeZone();
  BtnType = BtnType;
  Icon = Icon;
  IconType = IconType;

  constructor(
    private toastr: ToastrService,
    public browser: BrowserService,
    private httpCallback: HttpCallbackService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.CountryStats && this.CountryStats) {
      this.SetTableData(this.CountryStats);
    }
  }

  ngOnInit() {
    this.InitTable();
  }


  SetTableData(list: CountryStat[]): void {
    const table: StatTable[] = [];
    list.forEach((item) => {
      const prvStat: Stat = item.Stats[item.Stats.length - 1];
      const lastStat: Stat = _.last(item.Stats);
      table.push({
        Country: item.Country.Name,
        TodayConfirmed: prvStat.Confirmed,
        TodayRecovered: prvStat.Recovered,
        TodayDeaths: prvStat.Deaths,
        TotalConfirmed: lastStat.Confirmed,
        TotalRecovered: lastStat.Recovered,
        TotalDeaths: lastStat.Deaths,
        DeathRate: lastStat.DeathRate,
        RecoveredRate: lastStat.RecoveredRate,
        CriticalRate: lastStat.CriticalRate,
        MildRate: lastStat.MildRate
      });
    });
    this.TableData = table;
  }
  InitTable(): void {
    const fields: TableCol[] = [
      { Field: 'Country', Header: '國家' },
      { Field: 'TodayConfirmed', Header: '確診(今日)' },
      { Field: 'TodayDeaths', Header: '死亡(今日)' },
      { Field: 'TotalConfirmed', Header: '確診(總)' },
      { Field: 'TotalDeaths', Header: '死亡(總)' },
      { Field: 'TotalRecovered', Header: '治癒(總)' },
      { Field: 'RecoveredRate', Header: '治癒率' },
      { Field: 'MildRate', Header: '輕症率' },
      { Field: 'CriticalRate', Header: '重症率' },
      { Field: 'DeathRate', Header: '死亡率' }
    ];

    this.TableCols = fields;
    const canFilterCols: string[] = [];
    this.TableCols.forEach(i => canFilterCols.push(i.Field));
    this.TableFilterCols = canFilterCols;
  }


}
