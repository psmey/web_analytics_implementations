import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { CreateResourceDialogComponent } from './create-resource-dialog.component';

describe('CreateResourceDialogComponent', () => {
  let spectator: Spectator<CreateResourceDialogComponent>;
  const createComponent = createComponentFactory(CreateResourceDialogComponent);

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
