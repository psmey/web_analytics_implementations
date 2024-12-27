import { ComponentType } from '@angular/cdk/portal';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { IncomingResource, OutgoingResource } from '../../api/models';
import { ResourceService } from '../../api/services';
import { CreateResourceDialogComponent } from '../../components/create-resource-dialog/create-resource-dialog.component';

@Component({
  selector: 'app-resources',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css',
})
export class ResourcesComponent implements OnInit {
  protected readonly dialogComponent: ComponentType<CreateResourceDialogComponent> =
    CreateResourceDialogComponent;
  protected resources: OutgoingResource[] = [];

  private readonly matDialog: MatDialog = inject(MatDialog);
  private readonly resourceService: ResourceService = inject(ResourceService);

  public ngOnInit(): void {
    this.loadResources();
  }

  public openDialog(): void {
    const dialogRef = this.matDialog.open(CreateResourceDialogComponent);
    dialogRef.afterClosed().subscribe((result: IncomingResource) => {
      if (result) {
        this.addResource(result);
      }
    });
  }

  protected addResource(resource: IncomingResource): void {
    this.resourceService.resourceCreateResource({ body: resource });
    this.loadResources();
  }

  private loadResources(): void {
    this.resourceService
      .resourceGetResources()
      .subscribe(
        (resources: OutgoingResource[]) => (this.resources = resources)
      );
  }
}
