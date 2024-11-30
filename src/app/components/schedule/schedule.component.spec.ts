import { ScheduleComponent } from './schedule.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

describe('ScheduleComponent', () => {
  let spectator: Spectator<ScheduleComponent>;
  const createComponent = createComponentFactory(ScheduleComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
