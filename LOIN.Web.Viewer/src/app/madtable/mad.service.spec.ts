import { TestBed, inject } from '@angular/core/testing';

import { MadService } from './mad.service';

describe('MadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MadService]
    });
  });

  it('should be created', inject([MadService], (service: MadService) => {
    expect(service).toBeTruthy();
  }));
});
