import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DisplayedTableColumn } from '../../models/displayed-table-column';

@Component({
  selector: 'app-table',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    CommonModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit, OnChanges {
  @Input({ required: true }) displayedColumns!: DisplayedTableColumn[];
  @Input({ required: true }) data!: unknown[];
  @Input() enableRowClick = false;

  @Output() rowClicked = new EventEmitter<unknown>();

  @ViewChild(MatSort) sort!: MatSort;

  headerRows: string[] = [];

  dataSource = new MatTableDataSource<unknown, MatPaginator>([]);

  ngOnInit(): void {
    this.headerRows = this.displayedColumns.map(column => column.attribute);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClick(row: unknown) {
    if (this.enableRowClick) {
      this.rowClicked.emit(row);
    }
  }
}
