import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Group } from './group.model';
import { RequestOptionsArgs, Headers } from '@angular/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BaseCrudService } from '../shared/base/basecrudservice.class';

@Injectable()
export class GroupService extends BaseCrudService<Group> {
  constructor(authHttp: AuthHttp) {
    super('groups', authHttp);
  }
}
