import { DatePipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator/jest';
import { CallService } from './call.service';

describe('CallService', () => {
  let spectator: SpectatorService<CallService>;
  const createService = createServiceFactory({
    service: CallService,
    providers: [provideHttpClient(), provideHttpClientTesting(), DatePipe],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
