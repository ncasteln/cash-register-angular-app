import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashRegisterToolbarComponent } from './cash-register-toolbar.component';

describe('CashRegisterToolbarComponent', () => {
  let component: CashRegisterToolbarComponent;
  let fixture: ComponentFixture<CashRegisterToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashRegisterToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashRegisterToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
