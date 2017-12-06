import { NgModule } from '@angular/core';

import { LayoutModule } from '../shared/layout/layout.module';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DrawerService } from './drawer/drawer.service';
import { DrawerListComponent } from './drawer/list/drawer-list.component';
import { DrawerPermanentComponent } from './drawer/permament/drawer-permanent.component';
import { DrawerTemporaryComponent } from './drawer/temporary/drawer-temporary.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DrawerListComponent,
    DrawerPermanentComponent,
    DrawerTemporaryComponent,
    ToolbarComponent,
    NotFoundComponent
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
    ToolbarComponent,
    NotFoundComponent
  ],
  providers: [DrawerService]
})
export class CoreModule { }
