import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryStatContainerComponent } from './country-stat-container.component';

describe('CountryStatContainerComponent', () => {
  let component: CountryStatContainerComponent;
  let fixture: ComponentFixture<CountryStatContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryStatContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryStatContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
