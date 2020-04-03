import { TestBed } from '@angular/core/testing';

import { HttpCallbackService } from './http-callback.service';

describe('HttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpCallbackService = TestBed.get(HttpCallbackService);
    expect(service).toBeTruthy();
  });
});
