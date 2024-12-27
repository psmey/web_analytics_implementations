import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BidirectionalCoordinates } from '../../api/models';
import { Address } from '../../models/address';
import { openStreetMapResponse } from '../../models/osmCoordinatesResponse';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  private readonly URL = 'https://nominatim.openstreetmap.org/search.php';
  private readonly params = {
    polygon_geojson: 1,
    format: 'jsonv2',
  };

  private readonly httpClient: HttpClient = inject(HttpClient);

  public toCoordinates(address: Address): Observable<BidirectionalCoordinates> {
    return this.httpClient
      .get<openStreetMapResponse>(this.URL, {
        params: { ...address, ...this.params },
      })
      .pipe(
        map(
          (response: openStreetMapResponse) =>
            ({
              longitude: parseFloat(response.lat),
              latitude: parseFloat(response.lon),
            }) as BidirectionalCoordinates
        )
      );
  }

  public toAdress(coordinates: BidirectionalCoordinates): Observable<string> {
    return this.httpClient
      .get<openStreetMapResponse>(this.URL, {
        params: {
          q: `${coordinates.longitude} ${coordinates.latitude}`,
          ...this.params,
        },
      })
      .pipe(map((response: openStreetMapResponse) => response.displayName));
  }
}
