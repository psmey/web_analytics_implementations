import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { TechniciansComponent } from './technicians.component';

describe('TechniciansComponent', () => {
  let spectator: Spectator<TechniciansComponent>;
  const createComponent = createComponentFactory(TechniciansComponent);

  beforeEach(async () => (spectator = createComponent()));

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });
});
