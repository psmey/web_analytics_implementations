import { inject, Injectable } from '@angular/core';
import { from, map, mergeMap, Observable } from 'rxjs';
import {
  BidirectionalCoordinates,
  IncomingResource,
  OutgoingResource,
} from '../../../api/models';
import { ResourceApiService } from '../../../api/services';
import { DisplayedResource } from '../../models/resource/displayedResource';
import { Resource } from '../../models/resource/resource';
import { GeocodingService } from '../geocoding/geocoding.service';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private readonly resourceApiService = inject(ResourceApiService);
  private readonly geocodingService = inject(GeocodingService);

  loadResources(): Observable<DisplayedResource[]> {
    return this.resourceApiService
      .resourceGetResources()
      .pipe(map(resources => from(this.toDisplayedResources(resources))))
      .pipe(mergeMap(response => response));
  }

  addResource(resource: Resource): Observable<OutgoingResource> {
    return from(this.createMappedResource(resource)).pipe(
      mergeMap(reponse => reponse)
    );
  }

  private async toDisplayedResources(
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

  private async createMappedResource(
    resource: Resource
  ): Promise<Observable<OutgoingResource>> {
    const incomingResource = await this.toIncomingResource(resource);
    return this.resourceApiService.resourceCreateResource({
      body: incomingResource,
    });
  }

  private async toIncomingResource(
    resource: Resource
  ): Promise<IncomingResource> {
    const coordinates: BidirectionalCoordinates =
      await this.geocodingService.toCoordinates(resource.address);

    return {
      id: resource.id,
      coordinates: coordinates,
    };
  }
}
