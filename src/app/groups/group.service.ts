import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Group } from './group.model';
import { BaseCrudService } from '../shared/base/basecrudservice.class';

@Injectable()
export class GroupService extends BaseCrudService<Group> {

  constructor(authHttp: AuthHttp) {
    super(authHttp);
  }

  protected getResourceUrl(): string {
    return 'groups';
  }
}
