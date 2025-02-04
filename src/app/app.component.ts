import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AmplitudeService } from './services/amplitude/amplitude.service';
import { HotjarService } from './services/hotjar/hotjar.service';

@Component({
  selector: 'app-root',
  imports: [ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly amplitudeService = inject(AmplitudeService);
  private readonly hotjarService = inject(HotjarService);

  ngOnInit(): void {
    this.amplitudeService.init();
    this.hotjarService.init();
  }
}
