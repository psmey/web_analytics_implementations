import { DatePipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator/jest';
import { OptimizationService } from './optimization.service';

describe('OptimizationService', () => {
  let spectator: SpectatorService<OptimizationService>;
  const createService = createServiceFactory({
    service: OptimizationService,
    providers: [provideHttpClient(), provideHttpClientTesting(), DatePipe],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
