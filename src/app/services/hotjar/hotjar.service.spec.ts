import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { HotjarService } from './hotjar.service';

describe('HotjarService', () => {
  let spectator: SpectatorService<HotjarService>;
  const createService = createServiceFactory(HotjarService);

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
