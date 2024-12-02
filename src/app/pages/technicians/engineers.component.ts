import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { DisplayedTableColumn } from '../../models/displayed-table-column';

@Component({
  selector: 'app-technicians',
  imports: [TableComponent],
  templateUrl: './engineers.component.html',
  styleUrl: './engineers.component.css',
})
export class EngineersComponent {
  readonly displayedColumns: DisplayedTableColumn[] = [
    { attribute: 'label', heading: 'Label' },
    { attribute: 'name', heading: 'Name' },
  ];
  projects = [
    {
      label: 'IAA',
      name: 'lel',
    },
  ];
}
