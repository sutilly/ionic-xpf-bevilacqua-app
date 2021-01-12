import { TestBed } from '@angular/core/testing';

import { LNotificiationService } from './l-notificiation.service';

describe('LNoticiationsService', () => {
  let service: LNotificiationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LNotificiationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
