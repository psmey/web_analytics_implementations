import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-call-dialog',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-call-dialog.component.html',
  styleUrl: './create-call-dialog.component.css',
})
export class CreateCallDialogComponent {
  readonly formGroup = new FormGroup({
    id: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    address: new FormGroup({
      street: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      city: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      country: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      postalcode: new FormControl<number | null>(null, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    }),
    timeRestrictions: new FormGroup({
      duration: new FormControl<number | null>(null, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      startDate: new FormControl(new Date(), {
        nonNullable: true,
        validators: [Validators.required],
      }),
      endDate: new FormControl(new Date(), {
        nonNullable: true,
        validators: [Validators.required],
      }),
    }),
  });
}
