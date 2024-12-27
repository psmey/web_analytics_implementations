import { provideHttpClient } from '@angular/common/http';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { GeolocationService } from './geolocation.service';

describe('GeolocationService', () => {
  let spectator: SpectatorService<GeolocationService>;
  const createService = createServiceFactory({
    service: GeolocationService,
    providers: [provideHttpClient()],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
