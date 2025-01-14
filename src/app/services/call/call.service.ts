import { DatePipe } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { from, map, mergeMap, Observable } from 'rxjs';
import {
  BidirectionalCoordinates,
  IncomingCall,
  OutgoingCall,
} from '../../../api/models';
import { CallApiService } from '../../../api/services/call-api.service';
import { Call } from '../../models/call/call';
import { DisplayedCall } from '../../models/call/displayedCall';
import { GeocodingService } from '../geocoding/geocoding.service';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  private readonly callApiService: CallApiService = inject(CallApiService);
  private readonly geocodingService: GeocodingService =
    inject(GeocodingService);
  private readonly datePipe: DatePipe = inject(DatePipe);

  loadCalls(): Observable<DisplayedCall[]> {
    return this.callApiService
      .callGetCalls()
      .pipe(map(calls => from(this.toDisplayedCalls(calls))))
      .pipe(mergeMap(response => response));
  }

  addCalls(call: Call): Observable<OutgoingCall> {
    return from(this.createMappedCall(call)).pipe(
      mergeMap(response => response)
    );
  }

  private toDisplayedCalls(
    outgoingCalls: OutgoingCall[]
  ): Promise<DisplayedCall[]> {
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

  private async createMappedCall(call: Call) {
    const incomingCall = await this.toIncomingCall(call);
    return this.callApiService.callCreateCall({ body: incomingCall });
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
}
