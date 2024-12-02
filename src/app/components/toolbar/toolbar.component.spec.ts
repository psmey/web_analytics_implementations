import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let spectator: Spectator<ToolbarComponent>;
  const createComponent = createComponentFactory(ToolbarComponent);

  beforeEach(() => (spectator = createComponent()));

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });
});
