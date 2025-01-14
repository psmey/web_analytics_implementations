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
} from '../../../api/models';
import { ResourceApiService } from '../../../api/services';
import { CreateResourceDialogComponent } from '../../components/create-resource-dialog/create-resource-dialog.component';
import { TableComponent } from '../../components/table/table.component';
import { Address } from '../../models/address';
import { DisplayedResource } from '../../models/displayedResource';
import { ReadableResource } from '../../models/readableResource';
import { GeocodingService } from '../../services/geocoding/geocoding.service';

@Component({
  selector: 'app-resources',
  imports: [MatIconModule, MatButtonModule, TableComponent],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css',
})
export class ResourcesComponent implements OnInit {
  protected readonly dialogComponent: ComponentType<CreateResourceDialogComponent> =
    CreateResourceDialogComponent;
  protected resources: DisplayedResource[] = [];
  protected readonly columns: string[] = ['id', 'address'];

  private readonly matDialog: MatDialog = inject(MatDialog);
  private readonly resourceService: ResourceApiService =
    inject(ResourceApiService);
  private readonly geocodingService: GeocodingService =
    inject(GeocodingService);

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
          const resource = await this.toIncomingResource(readableResource);
          this.addResource(resource);
        }
      });
  }

  private addResource(resource: IncomingResource): void {
    this.resourceService
      .resourceCreateResource({ body: resource })
      .pipe(tap(() => this.loadResources()))
      .subscribe();
  }

  private loadResources(): void {
    this.resourceService
      .resourceGetResources()
      .subscribe(async (resources: OutgoingResource[]) => {
        this.resources = await this.toReadableResources(resources);
      });
  }

  private async toIncomingResource(
    resource: ReadableResource
  ): Promise<IncomingResource> {
    const address: Address = {
      ...resource,
      postalcode: parseInt(resource.postalcode),
    };

    const coordinates: BidirectionalCoordinates =
      await this.geocodingService.toCoordinates(address);

    return {
      id: resource.id,
      coordinates: coordinates,
    };
  }

  private async toReadableResources(
    resources: OutgoingResource[]
  ): Promise<DisplayedResource[]> {
    return Promise.all(
      resources.map(async (resource: OutgoingResource) => {
        return {
          id: resource.id,
          address: await this.geocodingService.toAdress(resource.coordinates),
        };
      })
    );
  }
}
