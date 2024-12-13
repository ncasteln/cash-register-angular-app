import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductActionsComponent } from './product-actions.component';

describe('ProductActionsComponent', () => {
  let component: ProductActionsComponent;
  let fixture: ComponentFixture<ProductActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
