import { provideHttpClient } from '@angular/common/http';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { CallsComponent } from './calls.component';

describe('CallsComponent', () => {
  let spectator: Spectator<CallsComponent>;
  const createComponent = createComponentFactory({
    component: CallsComponent,
    providers: [provideHttpClient()],
    detectChanges: false,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
