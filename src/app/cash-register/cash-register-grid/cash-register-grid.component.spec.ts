import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashRegisterGridComponent } from './cash-register-grid.component';

describe('CashRegisterGridComponent', () => {
  let component: CashRegisterGridComponent;
  let fixture: ComponentFixture<CashRegisterGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashRegisterGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashRegisterGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
