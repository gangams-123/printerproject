import { TestBed } from '@angular/core/testing';

import { Depatmentservice } from './depatmentservice';

describe('Depatmentservice', () => {
  let service: Depatmentservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Depatmentservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
