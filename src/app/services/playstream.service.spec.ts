import { TestBed, inject } from '@angular/core/testing';

import { PlaystreamService } from './playstream.service';

describe('PlaystreamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaystreamService]
    });
  });

  it('should be created', inject([PlaystreamService], (service: PlaystreamService) => {
    expect(service).toBeTruthy();
  }));
});
