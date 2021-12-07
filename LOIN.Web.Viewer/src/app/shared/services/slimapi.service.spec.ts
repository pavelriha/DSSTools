import { TestBed } from '@angular/core/testing';

import { SlimapiService } from './slimapi.service';

describe('SlimapiService', () => {
  let service: SlimapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlimapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
