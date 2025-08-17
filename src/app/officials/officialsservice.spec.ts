import { TestBed } from '@angular/core/testing';

import { Officialsservice } from './officialsservice';

describe('Officialsservice', () => {
  let service: Officialsservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Officialsservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
