import { MatDialogRef } from '@angular/material/dialog';
import {
  Spectator,
  SpyObject,
  byTestId,
  createComponentFactory,
} from '@ngneat/spectator/jest';
import { CreateResourceDialogComponent } from './create-resource-dialog.component';

const mockFormGroupValue = {
  id: 'id',
  street: 'street',
  city: 'city',
  country: 'country',
  postalcode: 'postalcode',
};

describe('CreateResourceDialogComponent', () => {
  let spectator: Spectator<CreateResourceDialogComponent>;
  let matDialogRef: SpyObject<MatDialogRef<CreateResourceDialogComponent>>;

  const createComponent = createComponentFactory({
    component: CreateResourceDialogComponent,
    providers: [
      {
        provide: MatDialogRef,
        useValue: { close: jest.fn() },
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    matDialogRef = spectator.inject(MatDialogRef);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('Cancel button', () => {
    it('should close dialog without return value', () => {
      const button = spectator.query<HTMLButtonElement>(
        byTestId('cancel-button')
      );

      spectator.click(button!);

      expect(matDialogRef.close).toHaveBeenCalledWith('');
    });

    it('should close dialog without return value although value is given', () => {
      const formGroup = spectator.component.formGroup;
      const button = spectator.query<HTMLButtonElement>(
        byTestId('cancel-button')
      );

      formGroup.patchValue(mockFormGroupValue);
      spectator.detectChanges();
      spectator.click(button!);

      expect(matDialogRef.close).toHaveBeenCalledWith('');
    });
  });

  describe('Create button', () => {
    it('should be disabled when form is invalid', () => {
      const button = spectator.query<HTMLButtonElement>(
        byTestId('create-button')
      );
      expect(button?.disabled).toBeTruthy();
    });

    it('should close dialog with form value', () => {
      const formGroup = spectator.component.formGroup;
      const button = spectator.query<HTMLButtonElement>(
        byTestId('create-button')
      );

      formGroup.patchValue(mockFormGroupValue);
      spectator.detectChanges();
      spectator.click(button!);

      expect(matDialogRef.close).toHaveBeenCalledWith(mockFormGroupValue);
    });
  });
});
