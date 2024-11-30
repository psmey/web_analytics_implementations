import { AppComponent } from './app.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory(AppComponent);

  beforeEach(async () => (spectator = createComponent()));

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });

  it(`should have the 'web_analytics_implementations' title`, () => {
    expect(spectator.component.title).toEqual('web_analytics_implementations');
  });

  it('should render title', () => {
    expect(spectator.query('h1')).toContainText(
      'Hello, web_analytics_implementations'
    );
  });
});
