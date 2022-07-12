import { TestBed } from '@angular/core/testing';

import { SetCookieService } from './set-cookie.service';

describe('SetCookieService', () => {
  let service: SetCookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetCookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
