import { ComponentType } from '@angular/cdk/portal';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { tap } from 'rxjs';
import {
  BidirectionalCoordinates,
  IncomingResource,
  OutgoingResource,
} from '../../api/models';
import { ResourceService } from '../../api/services';
import { CreateResourceDialogComponent } from '../../components/create-resource-dialog/create-resource-dialog.component';
import { Address } from '../../models/address';
import { ReadableResource } from '../../models/readableResource';
import { GeolocationService } from '../../services/geolocation/geolocation.service';

@Component({
  selector: 'app-resources',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css',
})
export class ResourcesComponent implements OnInit {
  protected readonly dialogComponent: ComponentType<CreateResourceDialogComponent> =
    CreateResourceDialogComponent;
  protected resources: OutgoingResource[] = [];

  private readonly matDialog: MatDialog = inject(MatDialog);
  private readonly resourceService: ResourceService = inject(ResourceService);
  private readonly geolocationService: GeolocationService =
    inject(GeolocationService);

  public ngOnInit(): void {
    this.loadResources();
  }

  public openDialog(): void {
    const dialogRef = this.matDialog.open<
      CreateResourceDialogComponent,
      never,
      ReadableResource
    >(CreateResourceDialogComponent);

    dialogRef
      .afterClosed()
      .subscribe(async (readableResource: ReadableResource | undefined) => {
        if (readableResource) {
          const resource = await this.parseResource(readableResource);
          this.addResource(resource);
        }
      });
  }

  protected addResource(resource: IncomingResource): void {
    this.resourceService
      .resourceCreateResource({ body: resource })
      .pipe(tap(() => this.loadResources()))
      .subscribe();
  }

  private loadResources(): void {
    this.resourceService
      .resourceGetResources()
      .subscribe(
        (resources: OutgoingResource[]) => (this.resources = resources)
      );
  }

  private async parseResource(
    resource: ReadableResource
  ): Promise<IncomingResource> {
    const address: Address = {
      street: resource.street,
      city: resource.city,
      country: resource.country,
      postalcode: parseInt(resource.postalcode),
    };

    const coordinates: BidirectionalCoordinates =
      await this.geolocationService.toCoordinates(address);

    return {
      id: resource.id,
      coordinates: coordinates,
    };
  }
}
