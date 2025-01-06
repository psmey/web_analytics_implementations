import { Component, inject, OnInit } from '@angular/core';
import { OutgoingCall } from '../../api/models';
import { CallService } from '../../api/services/call.service';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-calls',
  imports: [TableComponent],
  templateUrl: './calls.component.html',
  styleUrl: './calls.component.css',
})
export class CallsComponent implements OnInit {
  protected calls: OutgoingCall[] = [];
  protected readonly columns: string[] = [];

  private readonly callService: CallService = inject(CallService);

  public ngOnInit() {
    this.loadCalls();
  }

  private loadCalls() {
    this.callService
      .callGetCalls()
      .subscribe((calls: OutgoingCall[]) => (this.calls = calls));
  }
}
