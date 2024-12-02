import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { EngineersComponent } from './engineers.component';

describe('TechniciansComponent', () => {
  let spectator: Spectator<EngineersComponent>;
  const createComponent = createComponentFactory(EngineersComponent);

  beforeEach(() => (spectator = createComponent()));

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });
});
