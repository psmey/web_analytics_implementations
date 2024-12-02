import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let spectator: Spectator<TableComponent>;

  const createComponent = createComponentFactory(TableComponent);

  beforeEach(() => {
    spectator = createComponent({
      props: {
        displayedColumns: [
          { attribute: 'name', heading: 'Name' },
          { attribute: 'age', heading: 'Age' },
          { attribute: 'action', heading: 'Action' },
        ],
        data: [
          { name: 'Alice', age: 30, action: 'edit' },
          { name: 'Bob', age: 25, action: 'delete' },
        ],
      },
    });
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render the correct columns', () => {
    const headerCells = spectator.queryAll(
      '[mat-header-row] [mat-header-cell]'
    );
    const columnNames = headerCells.map(cell => cell.textContent?.trim());
    expect(columnNames).toEqual(['Name', 'Age', 'Action']);
  });

  it('should render the correct number of rows based on data', () => {
    const rows = spectator.queryAll('tr[mat-row]');
    expect(rows.length).toBe(2);
  });

  it('should render correct data in each cell', () => {
    const firstRowCells = spectator
      .queryAll('tr[mat-row]', { root: true })[0]
      .querySelectorAll('td');
    expect(firstRowCells[0].textContent).toContain('Alice');
    expect(firstRowCells[1].textContent).toContain('30');
    expect(firstRowCells[2].textContent).toContain('edit');
  });

  it('should filter table rows based on the filter input', () => {
    const filterInput = spectator.query('input[matInput]') as HTMLInputElement;
    filterInput.value = 'Alice';
    filterInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }));
    spectator.detectChanges();

    const rows = spectator.queryAll('tr[mat-row]');
    expect(spectator.component.dataSource.filteredData.length).toBe(1);
    expect(rows.length).toBe(1);
    expect(rows[0]).toContainText('Alice');
  });

  it('should reset the filter and show all rows when the input is cleared', () => {
    const filterInput = spectator.query('input[matInput]') as HTMLInputElement;
    spectator.typeInElement('Alice', filterInput);
    spectator.detectChanges();
    spectator.typeInElement('', filterInput);
    spectator.detectChanges();
    const rows = spectator.queryAll('tr[mat-row]');
    expect(rows.length).toBe(2);
  });
});
