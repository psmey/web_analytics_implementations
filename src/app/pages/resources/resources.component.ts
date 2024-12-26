import { ComponentType } from '@angular/cdk/portal';
import { Component, inject } from '@angular/core';
import { IncomingResource } from '../../api/models';
import { ResourceService } from '../../api/services';
import { AddButtonComponent } from '../../components/add-button/add-button.component';
import { CreateResourceDialogComponent } from '../../components/create-resource-dialog/create-resource-dialog.component';

@Component({
  selector: 'app-resources',
  imports: [AddButtonComponent],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css',
})
export class ResourcesComponent {
  protected readonly dialogComponent: ComponentType<CreateResourceDialogComponent> =
    CreateResourceDialogComponent;

  private readonly resourceService: ResourceService = inject(ResourceService);

  protected addResource(resource: IncomingResource): void {
    this.resourceService.resourceCreateResource({ body: resource });
  }
}
