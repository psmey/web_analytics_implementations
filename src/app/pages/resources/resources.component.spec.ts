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
import { ResourcesComponent } from './resources.component';

describe('ResourcesComponent', () => {
  let spectator: Spectator<ResourcesComponent>;
  let matomoTracker: SpyObject<MatomoTracker>;

  const createComponent = createComponentFactory({
    component: ResourcesComponent,
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
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
        byTestId('open-resource-dialog-button')
      ) as HTMLButtonElement;

      openCallDialogButton.click();

      expect(matomoTracker.trackEvent).toHaveBeenCalledWith(
        'resources',
        'openResourceDialog'
      );
    });
  });
});
