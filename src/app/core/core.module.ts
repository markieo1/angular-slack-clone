import { NgModule } from '@angular/core';

import { LayoutModule } from '../shared/layout/layout.module';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from 'app/core/toolbar/toolbar.component';
import { DrawerService } from 'app/core/drawer/drawer.service';
import { DrawerListComponent } from 'app/core/drawer/list/drawer-list.component';
import { DrawerPermanentComponent } from 'app/core/drawer/permament/drawer-permanent.component';
import { DrawerTemporaryComponent } from 'app/core/drawer/temporary/drawer-temporary.component';

@NgModule({
  declarations: [
    DrawerListComponent,
    DrawerPermanentComponent,
    DrawerTemporaryComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    LayoutModule
  ],
  exports: [
    DrawerListComponent,
    DrawerPermanentComponent,
    DrawerTemporaryComponent,
    ToolbarComponent
  ],
  providers: [DrawerService]
})
export class CoreModule { }
