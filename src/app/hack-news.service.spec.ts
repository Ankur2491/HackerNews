import { TestBed } from '@angular/core/testing';

import { HackNewsService } from './hack-news.service';

describe('HackServiceService', () => {
  let service: HackNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HackNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
