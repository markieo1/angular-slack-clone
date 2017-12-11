import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from '../auth/auth.module';
import { TagService } from './tag.service';

@NgModule({
  imports: [
    CommonModule,
    AuthModule
  ],
  providers: [
    TagService
  ]
})
export class TagsModule { }
