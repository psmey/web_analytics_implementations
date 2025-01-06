import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCallDialogComponent } from './create-call-dialog.component';

describe('CreateCallDialogComponent', () => {
  let component: CreateCallDialogComponent;
  let fixture: ComponentFixture<CreateCallDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCallDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCallDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
