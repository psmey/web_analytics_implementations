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
import { ResourcesComponent } from './resources.component';

describe('ResourcesComponent', () => {
  let spectator: Spectator<ResourcesComponent>;
  let matomoTracker: SpyObject<MatomoTracker>;
  let amplitudeService: SpyObject<AmplitudeService>;
  let hotjarService: SpyObject<HotjarService>;

  const createComponent = createComponentFactory({
    component: ResourcesComponent,
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
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
        byTestId('open-resource-dialog-button')
      ) as HTMLButtonElement;

      openCallDialogButton.click();

      expect(matomoTracker.trackEvent).toHaveBeenCalledWith(
        'resources',
        'openResourceDialog'
      );
    });
  });

  describe('Amplitude', () => {
    it('should call tracker for open call dialog button', () => {
      const openCallDialogButton = spectator.query(
        byTestId('open-resource-dialog-button')
      ) as HTMLButtonElement;

      openCallDialogButton.click();

      expect(amplitudeService.track).toHaveBeenCalledWith({
        event_type: 'openResourceDialog',
      });
    });
  });

  describe('Hotjar', () => {
    it('should call tracker for open call dialog button', () => {
      const openCallDialogButton = spectator.query(
        byTestId('open-resource-dialog-button')
      ) as HTMLButtonElement;

      openCallDialogButton.click();

      expect(hotjarService.track).toHaveBeenCalledWith('openResourceDialog');
    });
  });
});
