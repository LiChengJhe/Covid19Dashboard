import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesStatBarChartComponent } from './countries-stat-bar-chart.component';

describe('CountriesStatBarChartComponent', () => {
  let component: CountriesStatBarChartComponent;
  let fixture: ComponentFixture<CountriesStatBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountriesStatBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesStatBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
