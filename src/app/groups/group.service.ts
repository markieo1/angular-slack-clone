import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Group } from './group.model';
import { RequestOptionsArgs, Headers } from '@angular/http';

@Injectable()
export class GroupService {
  private groups: Observable<Array<Group>>;

  constructor(private authHttp: AuthHttp) {
  }

  /**
   * Gets all the groups
   */
  getGroups(): Observable<Array<Group>> {
    if (!this.groups) {
      this.groups = this.authHttp.get(`${environment.apiUrl}/groups`)
        .map(r => r.json())
        .publishReplay(1)
        .refCount();
    }
    return this.groups;
  }

  /**
   * Gets a single group
   * @param id The id of the group
   */
  getGroup(id: string): Observable<Group> {
    return this.getGroups()
      .flatMap(x => x)
      .filter((group) => group.id === id);
  }
}
