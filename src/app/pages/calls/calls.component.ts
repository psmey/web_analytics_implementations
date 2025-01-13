import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { tap } from 'rxjs';
import {
  BidirectionalCoordinates,
  IncomingCall,
  OutgoingCall,
} from '../../../api/models';
import { IncomingOptimizationOptimizationDefinition } from '../../../api/models/incoming-optimization-optimization-definition';
import { CallService } from '../../../api/services/call.service';
import { OptimizationService } from '../../../api/services/optimization.service';
import { CreateCallDialogComponent } from '../../components/create-call-dialog/create-call-dialog.component';
import { TableComponent } from '../../components/table/table.component';
import { Call } from '../../models/call';
import { DisplayedCall } from '../../models/displayedCall';
import { GeocodingService } from '../../services/geocoding/geocoding.service';

@Component({
  selector: 'app-calls',
  imports: [MatIconModule, MatButtonModule, TableComponent],
  templateUrl: './calls.component.html',
  styleUrl: './calls.component.css',
})
export class CallsComponent implements OnInit {
  protected calls: DisplayedCall[] = [];
  protected readonly columns: string[] = [
    'id',
    'address',
    'startDate',
    'endDate',
    'duration',
    'routeDate',
  ];

  private readonly callService: CallService = inject(CallService);
  private readonly optimizationService: OptimizationService =
    inject(OptimizationService);
  private readonly geocodingService: GeocodingService =
    inject(GeocodingService);
  private readonly matDialog: MatDialog = inject(MatDialog);
  private readonly datePipe: DatePipe = inject(DatePipe);

  public ngOnInit() {
    this.loadCalls();
  }

  public openDialog(): void {
    const dialogRef = this.matDialog.open<
      CreateCallDialogComponent,
      never,
      Call
    >(CreateCallDialogComponent);

    dialogRef.afterClosed().subscribe(async (call: Call | undefined) => {
      if (call) {
        const incomingCall = await this.toIncomingCall(call);
        this.addCall(incomingCall);
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
      .callGetCalls()
      .subscribe(
        async (calls: OutgoingCall[]) =>
          (this.calls = await this.toDisplayedCalls(calls))
      );
  }

  private addCall(call: IncomingCall) {
    this.callService
      .callCreateCall({ body: call })
      .pipe(tap(() => this.loadCalls()))
      .subscribe();
  }

  private async toIncomingCall(call: Call): Promise<IncomingCall> {
    const coordinates: BidirectionalCoordinates =
      await this.geocodingService.toCoordinates(call.address);

    const startDate = this.datePipe.transform(
      call.timeRestrictions.startDate,
      'yyyy-MM-dd'
    )!;

    const endDate = this.datePipe.transform(
      call.timeRestrictions.endDate,
      'yyyy-MM-dd'
    )!;

    const incomingCall: IncomingCall = {
      id: call.id,
      coordinates,
      timeRestrictions: {
        startDate,
        endDate,
        duration: call.timeRestrictions.duration,
      },
    };

    return incomingCall;
  }

  private async toDisplayedCalls(outgoingCalls: OutgoingCall[]) {
    return Promise.all(
      outgoingCalls.map(async outgoingCall => {
        const address: string = await this.geocodingService.toAdress(
          outgoingCall.coordinates
        );

        const displayedCall: DisplayedCall = {
          ...outgoingCall,
          ...outgoingCall.timeRestrictions,
          address,
        };

        return displayedCall;
      })
    );
  }
}
