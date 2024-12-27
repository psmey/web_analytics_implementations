import { provideHttpClient } from '@angular/common/http';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { ResourcesComponent } from './resources.component';

describe('ResourcesComponent', () => {
  let spectator: Spectator<ResourcesComponent>;
  const createComponent = createComponentFactory({
    component: ResourcesComponent,
    providers: [provideHttpClient()],
    detectChanges: false,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
