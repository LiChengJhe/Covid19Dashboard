import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryStatLineChartComponent } from './country-stat-line-chart.component';

describe('CountriesStatLineChartComponent', () => {
  let component: CountryStatLineChartComponent;
  let fixture: ComponentFixture<CountryStatLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryStatLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryStatLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
