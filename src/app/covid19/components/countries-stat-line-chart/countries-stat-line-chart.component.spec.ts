import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesStatLineChartComponent } from './countries-stat-line-chart.component';

describe('CountriesStatLineChartComponent', () => {
  let component: CountriesStatLineChartComponent;
  let fixture: ComponentFixture<CountriesStatLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountriesStatLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesStatLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
