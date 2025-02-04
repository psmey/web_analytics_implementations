import { DatePipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  Spectator,
  SpyObject,
  byTestId,
  createComponentFactory,
} from '@ngneat/spectator/jest';
import { MatomoTracker } from 'ngx-matomo-client';
import { provideMatomoTesting } from 'ngx-matomo-client/testing';
import { AmplitudeService } from '../../services/amplitude/amplitude.service';
import { HotjarService } from '../../services/hotjar/hotjar.service';
import { CallsComponent } from './calls.component';

describe('CallsComponent', () => {
  let spectator: Spectator<CallsComponent>;
  let matomoTracker: SpyObject<MatomoTracker>;
  let amplitudeService: SpyObject<AmplitudeService>;
  let hotjarService: SpyObject<HotjarService>;

  const createComponent = createComponentFactory({
    component: CallsComponent,
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
      DatePipe,
      provideMatomoTesting(),
    ],
    detectChanges: false,
    mocks: [MatomoTracker, AmplitudeService, HotjarService],
  });

  beforeEach(() => {
    spectator = createComponent();

    matomoTracker = spectator.inject(MatomoTracker);
    matomoTracker.trackEvent.mockReturnThis();

    amplitudeService = spectator.inject(AmplitudeService);
    amplitudeService.track.mockReturnThis();

    hotjarService = spectator.inject(HotjarService);
    hotjarService.track.mockReturnThis();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('Matomo', () => {
    it('should call tracker for open call dialog button', () => {
      const openCallDialogButton = spectator.query(
        byTestId('open-call-dialog-button')
      ) as HTMLButtonElement;

      openCallDialogButton.click();

      expect(matomoTracker.trackEvent).toHaveBeenCalledWith(
        'calls',
        'openCallDialog'
      );
    });

    it('should call tracker attributes for schedule calls button', () => {
      const scheduleCallsButton = spectator.query(
        byTestId('schedule-calls-button')
      ) as HTMLButtonElement;

      scheduleCallsButton.click();

      expect(matomoTracker.trackEvent).toHaveBeenCalledWith(
        'calls',
        'scheduleCalls'
      );
    });
  });

  describe('Amplitude', () => {
    it('should call tracker for open call dialog button', () => {
      const openCallDialogButton = spectator.query(
        byTestId('open-call-dialog-button')
      ) as HTMLButtonElement;

      openCallDialogButton.click();

      expect(amplitudeService.track).toHaveBeenCalledWith({
        event_type: 'openCallDialog',
      });
    });

    it('should call tracker attributes for schedule calls button', () => {
      const scheduleCallsButton = spectator.query(
        byTestId('schedule-calls-button')
      ) as HTMLButtonElement;

      scheduleCallsButton.click();

      expect(amplitudeService.track).toHaveBeenCalledWith({
        event_type: 'scheduleCalls',
      });
    });
  });

  describe('Hotjar', () => {
    it('should call tracker for open call dialog button', () => {
      const openCallDialogButton = spectator.query(
        byTestId('open-call-dialog-button')
      ) as HTMLButtonElement;

      openCallDialogButton.click();

      expect(hotjarService.track).toHaveBeenCalledWith('openCallDialog');
    });

    it('should call tracker attributes for schedule calls button', () => {
      const scheduleCallsButton = spectator.query(
        byTestId('schedule-calls-button')
      ) as HTMLButtonElement;

      scheduleCallsButton.click();

      expect(hotjarService.track).toHaveBeenCalledWith('scheduleCalls');
    });
  });
});
