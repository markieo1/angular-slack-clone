import { NgModule } from '@angular/core';

import { LayoutModule } from '../shared/layout/layout.module';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DrawerService } from './drawer/drawer.service';
import { DrawerListComponent } from './drawer/list/drawer-list.component';
import { DrawerPermanentComponent } from './drawer/permament/drawer-permanent.component';
import { DrawerTemporaryComponent } from './drawer/temporary/drawer-temporary.component';
import { RouterModule } from '@angular/router';
import { ToolbarService } from './toolbar/toolbar.service';

@NgModule({
  declarations: [
    DrawerListComponent,
    DrawerPermanentComponent,
    DrawerTemporaryComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule
  ],
  exports: [
    DrawerListComponent,
    DrawerPermanentComponent,
    DrawerTemporaryComponent,
    ToolbarComponent
  ],
  providers: [DrawerService, ToolbarService]
})
export class CoreModule { }
