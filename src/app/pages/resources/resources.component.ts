import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatomoTracker } from 'ngx-matomo-client';
import { tap } from 'rxjs';
import { CreateResourceDialogComponent } from '../../components/create-resource-dialog/create-resource-dialog.component';
import { TableComponent } from '../../components/table/table.component';
import { DisplayedResource } from '../../models/resource/displayedResource';
import { Resource } from '../../models/resource/resource';
import { AmplitudeService } from '../../services/amplitude/amplitude.service';
import { ResourceService } from '../../services/resource/resource.service';

@Component({
  selector: 'app-resources',
  imports: [MatIconModule, MatButtonModule, TableComponent],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css',
})
export class ResourcesComponent implements OnInit {
  private readonly trackingCategory = 'resources';

  protected readonly dialogComponent = CreateResourceDialogComponent;
  protected readonly columns = ['id', 'address'];

  protected resources: DisplayedResource[] = [];

  private readonly matDialog = inject(MatDialog);
  private readonly resourceService = inject(ResourceService);
  private readonly matomoTracker = inject(MatomoTracker);
  private readonly amplitudeService = inject(AmplitudeService);

  public ngOnInit(): void {
    this.loadResources();
  }

  public openDialog(): void {
    const eventType = 'openResourceDialog';
    this.matomoTracker.trackEvent(this.trackingCategory, eventType);
    this.amplitudeService.track({ event_type: eventType });

    const dialogRef = this.matDialog.open<
      CreateResourceDialogComponent,
      never,
      Resource
    >(CreateResourceDialogComponent);

    dialogRef
      .afterClosed()
      .subscribe(async (resource: Resource | undefined) => {
        if (resource) {
          this.addResource(resource);
        }
      });
  }

  private addResource(resource: Resource): void {
    this.resourceService
      .addResource(resource)
      .pipe(tap(() => this.loadResources()))
      .subscribe();
  }

  private loadResources(): void {
    this.resourceService
      .loadResources()
      .subscribe(resources => (this.resources = resources));
  }
}
