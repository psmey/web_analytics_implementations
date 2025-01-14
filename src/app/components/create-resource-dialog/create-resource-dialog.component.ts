import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-resource-dialog',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-resource-dialog.component.html',
  styleUrl: './create-resource-dialog.component.css',
})
export class CreateResourceDialogComponent {
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
  });
}
