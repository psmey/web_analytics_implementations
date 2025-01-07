import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimizationButtonComponent } from './optimization-button.component';

describe('OptimizationButtonComponent', () => {
  let component: OptimizationButtonComponent;
  let fixture: ComponentFixture<OptimizationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptimizationButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OptimizationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
