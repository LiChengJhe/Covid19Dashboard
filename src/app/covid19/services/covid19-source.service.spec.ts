import { TestBed } from '@angular/core/testing';

import { Covid19SourceService } from './covid19-source.service';

describe('Covid19SourceService', () => {
  let service: Covid19SourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Covid19SourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
