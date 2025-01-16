import { DatePipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { CallsComponent } from './calls.component';

describe('CallsComponent', () => {
  let spectator: Spectator<CallsComponent>;
  const createComponent = createComponentFactory({
    component: CallsComponent,
    providers: [provideHttpClient(), provideHttpClientTesting(), DatePipe],
    detectChanges: false,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
