import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { AddButtonComponent } from './add-button.component';

describe('AddButtonComponent', () => {
  let spectator: Spectator<AddButtonComponent<unknown, unknown>>;
  const createComponent = createComponentFactory(AddButtonComponent);

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
