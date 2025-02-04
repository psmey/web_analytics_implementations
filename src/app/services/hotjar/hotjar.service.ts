import { Injectable } from '@angular/core';
import Hotjar from '@hotjar/browser';
import { environment } from '../../../environments/environment.template';

@Injectable({
  providedIn: 'root',
})
export class HotjarService {
  init(): void {
    Hotjar.init(environment.HOTJAR.SITE_ID, environment.HOTJAR.VERSION, {
      debug: true,
    });
  }

  track(actionName: string): void {
    Hotjar.event(actionName);
  }
}
