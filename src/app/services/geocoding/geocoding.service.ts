import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { BidirectionalCoordinates } from '../../api/models';
import { Address } from '../../models/address';
import { openStreetMapResponse } from '../../models/osmCoordinatesResponse';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private readonly URL = 'https://nominatim.openstreetmap.org/search.php';
  private readonly params = {
    polygon_geojson: 1,
    format: 'jsonv2',
  };

  private readonly httpClient: HttpClient = inject(HttpClient);

  public toCoordinates(address: Address): Promise<BidirectionalCoordinates> {
    return firstValueFrom(
      this.httpClient
        .get<openStreetMapResponse[]>(this.URL, {
          params: { ...address, ...this.params },
        })
        .pipe(
          map(
            (response: openStreetMapResponse[]) =>
              ({
                longitude: parseFloat(response[0].lon),
                latitude: parseFloat(response[0].lat),
              }) as BidirectionalCoordinates
          )
        )
    );
  }

  public toAdress(coordinates: BidirectionalCoordinates): Promise<string> {
    return firstValueFrom(
      this.httpClient
        .get<openStreetMapResponse[]>(this.URL, {
          params: {
            q: `${coordinates.latitude} ${coordinates.longitude}`,
            ...this.params,
          },
        })
        .pipe(
          map((response: openStreetMapResponse[]) => response[0].display_name)
        )
    );
  }
}
