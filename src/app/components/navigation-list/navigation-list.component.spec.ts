import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { NavigationListComponent } from './navigation-list.component';

describe('NavigationListComponent', () => {
  let spectator: Spectator<NavigationListComponent>;
  const createComponent = createComponentFactory(NavigationListComponent);

  beforeEach(() => (spectator = createComponent()));

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });
});
