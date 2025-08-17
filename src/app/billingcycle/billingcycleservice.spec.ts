import { TestBed } from '@angular/core/testing';

import { Billingcycleservice } from './billingcycleservice';

describe('Billingcycleservice', () => {
  let service: Billingcycleservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Billingcycleservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
