import { TestBed, inject } from '@angular/core/testing';

import { LoadMapService } from './load-map.service';

describe('LoadMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadMapService]
    });
  });

  it('should be created', inject([LoadMapService], (service: LoadMapService) => {
    expect(service).toBeTruthy();
  }));
});
