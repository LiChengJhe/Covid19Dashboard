import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredFieldTipsComponent } from './required-field-tips.component';

describe('RequiredFieldTipsComponent', () => {
  let component: RequiredFieldTipsComponent;
  let fixture: ComponentFixture<RequiredFieldTipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequiredFieldTipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredFieldTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
