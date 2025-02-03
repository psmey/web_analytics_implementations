import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatomoTracker } from 'ngx-matomo-client';
import { tap } from 'rxjs';
import { CreateCallDialogComponent } from '../../components/create-call-dialog/create-call-dialog.component';
import { TableComponent } from '../../components/table/table.component';
import { Call } from '../../models/call/call';
import { DisplayedCall } from '../../models/call/displayedCall';
import { CallService } from '../../services/call/call.service';
import { OptimizationService } from '../../services/optimization/optimization.service';

@Component({
  selector: 'app-calls',
  imports: [
    MatIconModule,
    MatButtonModule,
    TableComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './calls.component.html',
  styleUrl: './calls.component.css',
})
export class CallsComponent implements OnInit {
  protected readonly columns = [
    'id',
    'routeDate',
    'startDate',
    'endDate',
    'duration',
    'address',
  ];
  private readonly trackingCategory = 'calls';

  protected calls: DisplayedCall[] = [];
  protected currentOptimizationEnded = true;

  private readonly callService = inject(CallService);
  private readonly optimizationService = inject(OptimizationService);
  private readonly matDialog = inject(MatDialog);
  private readonly matomoTracker = inject(MatomoTracker);

  ngOnInit() {
    this.loadCalls();
  }

  startOptimization() {
    this.matomoTracker.trackEvent(this.trackingCategory, 'scheduleCalls');

    this.currentOptimizationEnded = false;
    this.optimizationService
      .startOptimization()
      .pipe(
        tap(id => {
          if (id) {
            this.loadCallsWhenOptimizationEnded(id);
          }
        })
      )
      .subscribe();
  }

  openDialog() {
    this.matomoTracker.trackEvent(this.trackingCategory, 'openCallDialog');

    const dialogRef = this.matDialog.open<
      CreateCallDialogComponent,
      never,
      Call
    >(CreateCallDialogComponent);

    dialogRef.afterClosed().subscribe(async (call: Call | undefined) => {
      if (call) {
        this.addCall(call);
      }
    });
  }

  private loadCalls() {
    this.callService
      .loadCalls()
      .subscribe((calls: DisplayedCall[]) => (this.calls = calls));
  }

  private addCall(call: Call) {
    this.callService
      .addCalls(call)
      .pipe(tap(() => this.loadCalls()))
      .subscribe();
  }

  private loadCallsWhenOptimizationEnded(id: string) {
    this.optimizationService
      .checkUntilOptimizationEnded(id)
      .pipe(tap(() => this.loadCalls()))
      .subscribe((ended: boolean) => (this.currentOptimizationEnded = ended));
  }
}
