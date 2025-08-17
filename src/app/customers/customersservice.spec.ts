import { TestBed } from '@angular/core/testing';

import { Customersservice } from './customersservice';

describe('Customersservice', () => {
  let service: Customersservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Customersservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
