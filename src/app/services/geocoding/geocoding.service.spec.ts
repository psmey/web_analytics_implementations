import { provideHttpClient } from '@angular/common/http';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator/jest';
import { GeocodingService } from './geocoding.service';

describe('GeocodingService', () => {
  let spectator: SpectatorService<GeocodingService>;
  const createService = createServiceFactory({
    service: GeocodingService,
    providers: [provideHttpClient()],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
