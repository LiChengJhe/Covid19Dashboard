import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryStatBarChartComponent } from './country-stat-bar-chart.component';

describe('CountriesStatBarChartComponent', () => {
  let component: CountryStatBarChartComponent;
  let fixture: ComponentFixture<CountryStatBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryStatBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryStatBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
