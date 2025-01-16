import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { CreateCallDialogComponent } from './create-call-dialog.component';

describe('CreateCallDialogComponent', () => {
  let spectator: Spectator<CreateCallDialogComponent>;
  const createComponent = createComponentFactory(CreateCallDialogComponent);

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
