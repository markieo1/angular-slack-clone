import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Group } from './group.model';
import { BaseCrudService } from '../shared/base/basecrudservice.class';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GroupService extends BaseCrudService<Group> {

  constructor(authHttp: AuthHttp) {
    super(authHttp);
  }

  /**
   * Gets the related groups for the specified id
   * @param id The id to get the related groups for
   */
  public getRelated(id: string): Observable<Group[]> {
    return this.authHttp.get(`${environment.apiUrl}/${this.getResourceUrl()}/${id}/related`)
      .map(r => r.json());
  }

  protected getResourceUrl(): string {
    return 'groups';
  }
}
