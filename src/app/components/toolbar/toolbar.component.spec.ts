import { provideRouter } from '@angular/router';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { routes } from '../../app.routes';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let spectator: Spectator<ToolbarComponent>;
  const createComponent = createComponentFactory({
    component: ToolbarComponent,
    providers: [provideRouter(routes)],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
