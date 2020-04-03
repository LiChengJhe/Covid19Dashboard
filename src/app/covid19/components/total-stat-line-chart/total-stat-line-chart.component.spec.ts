import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalStatLineChartComponent } from './total-stat-line-chart.component';

describe('TotalStatLineChartComponent', () => {
  let component: TotalStatLineChartComponent;
  let fixture: ComponentFixture<TotalStatLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalStatLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalStatLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
