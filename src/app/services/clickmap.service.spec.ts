import { TestBed, inject } from '@angular/core/testing';

import { ClickmapService } from './clickmap.service';

describe('ClickmapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClickmapService]
    });
  });

  it('should be created', inject([ClickmapService], (service: ClickmapService) => {
    expect(service).toBeTruthy();
  }));
});
