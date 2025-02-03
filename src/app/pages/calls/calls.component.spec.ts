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
import { CallsComponent } from './calls.component';

describe('CallsComponent', () => {
  let spectator: Spectator<CallsComponent>;
  let matomoTracker: SpyObject<MatomoTracker>;

  const createComponent = createComponentFactory({
    component: CallsComponent,
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
      DatePipe,
      provideMatomoTesting(),
    ],
    detectChanges: false,
    mocks: [MatomoTracker],
  });

  beforeEach(() => {
    spectator = createComponent();
    matomoTracker = spectator.inject(MatomoTracker);
    matomoTracker.trackEvent.mockReturnThis();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('matomo', () => {
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
});
