import { TestBed } from '@angular/core/testing';

import { ProductActionsService } from './product-actions.service';

describe('ProductActionsService', () => {
  let service: ProductActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
