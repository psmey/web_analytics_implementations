import { provideHttpClient } from '@angular/common/http';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { ResourceService } from './resource.service';

describe('ResourceService', () => {
  let spectator: SpectatorService<ResourceService>;
  const createService = createServiceFactory({
    service: ResourceService,
    providers: [provideHttpClient()],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
