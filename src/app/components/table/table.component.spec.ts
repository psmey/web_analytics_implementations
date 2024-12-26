import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { TableComponent } from './table.component';

describe('ToolbarComponent', () => {
  let spectator: Spectator<TableComponent<unknown>>;
  const createComponent = createComponentFactory(TableComponent);

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
