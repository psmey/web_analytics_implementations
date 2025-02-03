import * as amplitude from '@amplitude/analytics-browser';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.template';

@Injectable({
  providedIn: 'root',
})
export class AmplitudeService {
  init(): void {
    amplitude.init(environment.AMPLITUDE_API_KEY, {
      serverZone: 'EU',
      autocapture: {
        elementInteractions: true,
      },
    });
  }

  track(event: amplitude.Types.BaseEvent): void {
    amplitude.track(event);
  }
}
