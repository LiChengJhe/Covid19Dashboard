import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalStatContainerComponent } from './global-stat-container.component';

describe('GlobalStatContainerComponent', () => {
  let component: GlobalStatContainerComponent;
  let fixture: ComponentFixture<GlobalStatContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalStatContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalStatContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
