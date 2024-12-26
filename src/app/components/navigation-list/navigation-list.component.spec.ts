import { provideRouter } from '@angular/router';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { routes } from '../../app.routes';
import { NavigationListComponent } from './navigation-list.component';

describe('NavigationListComponent', () => {
  let spectator: Spectator<NavigationListComponent>;
  const createComponent = createComponentFactory({
    component: NavigationListComponent,
    providers: [provideRouter(routes)],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
