import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestComponent } from './harvest.component';

describe('HarvestComponent', () => {
  let component: HarvestComponent;
  let fixture: ComponentFixture<HarvestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HarvestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
