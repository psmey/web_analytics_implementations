import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { tap } from 'rxjs';
import { IncomingOptimizationOptimizationDefinition } from '../../../api/models/incoming-optimization-optimization-definition';
import { OptimizationService } from '../../../api/services';
import { CreateCallDialogComponent } from '../../components/create-call-dialog/create-call-dialog.component';
import { TableComponent } from '../../components/table/table.component';
import { Call } from '../../models/call';
import { DisplayedCall } from '../../models/displayedCall';
import { CallService } from '../../services/call/call.service';

@Component({
  selector: 'app-calls',
  imports: [MatIconModule, MatButtonModule, TableComponent],
  templateUrl: './calls.component.html',
  styleUrl: './calls.component.css',
})
export class CallsComponent implements OnInit {
  protected calls: DisplayedCall[] = [];
  protected readonly columns = [
    'id',
    'address',
    'startDate',
    'endDate',
    'duration',
    'routeDate',
  ];

  private readonly callService = inject(CallService);
  private readonly matDialog = inject(MatDialog);
  private readonly datePipe = inject(DatePipe);
  private readonly optimizationService = inject(OptimizationService);

  ngOnInit() {
    this.loadCalls();
  }

  openDialog() {
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

  startOptimization() {
    const startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;

    const date = new Date();
    const oneYearFromNow = date.setFullYear(date.getFullYear() + 1);

    const endDate = this.datePipe.transform(oneYearFromNow, 'yyyy-MM-dd')!;

    const definition: IncomingOptimizationOptimizationDefinition = {
      recordedCallsFilter: {
        earliestEndDate: startDate,
        earliestStartDate: startDate,
        latestEndDate: endDate,
        latestStartDate: endDate,
      },
      startDate,
      endDate,
    };

    this.optimizationService
      .optimizationCreateOptimization({
        body: definition,
      })
      .pipe(tap(() => this.loadCalls()))
      .subscribe();
  }

  private loadCalls() {
    this.callService
      .loadCalls()
      .subscribe((calls: DisplayedCall[]) => (this.calls = calls));
  }

  private addCall(call: Call) {
    this.callService.addCalls(call).subscribe();
  }
}
