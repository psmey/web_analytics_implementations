import { ComponentType } from '@angular/cdk/portal';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-button',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.css',
})
export class AddButtonComponent<TDialog, TResult> {
  @Input({ required: true }) addFunction!: (result: TResult) => void;
  @Input({ required: true }) dialogComponent!: ComponentType<TDialog>;

  private readonly matDialog: MatDialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.matDialog.open(this.dialogComponent, {
      width: '30vw',
    });
    dialogRef.afterClosed().subscribe((result: TResult) => {
      if (result !== undefined) {
        this.addFunction(result);
      }
    });
  }
}
