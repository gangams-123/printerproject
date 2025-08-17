import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Billingcycle } from './billingcycle';

describe('Billingcycle', () => {
  let component: Billingcycle;
  let fixture: ComponentFixture<Billingcycle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Billingcycle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Billingcycle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
