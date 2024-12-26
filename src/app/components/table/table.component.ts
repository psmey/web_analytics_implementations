import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TableColumn } from '../../models/tableColumn';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent<TData> {
  @Input({ required: true }) dataSource!: TData[];
  @Input({ required: true }) columns!: TableColumn[];
  @Input({ required: true }) displayedColumns!: string[];
}
