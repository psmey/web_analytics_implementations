import { Component, inject, OnInit } from '@angular/core';
import { EngineerService } from '../../api/engineer/engineer.service';
import { TableComponent } from '../../components/table/table.component';
import { DisplayedEngineer } from '../../models/displayed-engineer';
import { DisplayedTableColumn } from '../../models/displayed-table-column';
import { Engineer } from '../../models/engineer';

@Component({
  selector: 'app-technicians',
  imports: [TableComponent],
  templateUrl: './engineers.component.html',
  styleUrl: './engineers.component.css',
})
export class EngineersComponent implements OnInit {
  readonly displayedColumns: DisplayedTableColumn[] = [
    { attribute: 'id', heading: 'ID' },
    { attribute: 'name', heading: 'Name' },
    { attribute: 'email', heading: 'Email' },
    { attribute: 'phoneNumber', heading: 'Phone Number' },
    { attribute: 'skills', heading: 'Skills' },
    { attribute: 'country', heading: 'Country' },
    { attribute: 'city', heading: 'City' },
    { attribute: 'postalCode', heading: 'Postal Code' },
    { attribute: 'address', heading: 'Address' },
  ];

  engineers: DisplayedEngineer[] = [];

  private readonly EngineerService = inject(EngineerService);

  ngOnInit() {
    this.loadEngineers();
  }

  private loadEngineers() {
    this.EngineerService.getAll().subscribe(
      (engineers: Engineer[]) =>
        (this.engineers = engineers.map((engineer: Engineer) =>
          this.mapEngineer(engineer)
        ))
    );
  }

  private mapEngineer(engineer: Engineer): DisplayedEngineer {
    return {
      id: engineer.id,
      name: engineer.contact.firstName + ' ' + engineer.contact.lastName,
      email: engineer.contact.email,
      phoneNumber: engineer.contact.phoneNumber,
      skills: engineer.skills.toString(),
      country: engineer.address.country,
      city: engineer.address.city,
      postalCode: engineer.address.postalCode,
      address: engineer.address.street + ' ' + engineer.address.houseNumber,
    };
  }
}
