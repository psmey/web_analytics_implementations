import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { CreateResourceDialogComponent } from './create-resource-dialog.component';

describe('CreateResourceDialogComponent', () => {
  let spectator: Spectator<CreateResourceDialogComponent>;
  // let matDialogRef: SpyObject<MatDialogRef<CreateResourceDialogComponent>>;

  const createComponent = createComponentFactory({
    component: CreateResourceDialogComponent,
    // providers: [
    //   {
    //     provide: MatDialogRef,
    //     useValue: { close: jest.fn() },
    //   },
    // ],
  });

  beforeEach(() => {
    spectator = createComponent();
    // matDialogRef = spectator.inject(MatDialogRef);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
