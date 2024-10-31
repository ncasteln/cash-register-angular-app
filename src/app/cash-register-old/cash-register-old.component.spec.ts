import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashRegisterOldComponent } from './cash-register-old.component';

describe('CashRegisterOldComponent', () => {
  let component: CashRegisterOldComponent;
  let fixture: ComponentFixture<CashRegisterOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashRegisterOldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashRegisterOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
