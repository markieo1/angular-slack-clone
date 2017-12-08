import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Group } from './group.model';
import { RequestOptionsArgs, Headers } from '@angular/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class GroupService {
  private groupsSubject = new ReplaySubject<Group[]>(1);

  private groups: Observable<Array<Group>>;

  constructor(private authHttp: AuthHttp) {
    this.fetchData();
  }

  /**
   * Gets all the groups
   */
  getGroups(): Observable<Array<Group>> {
    if (!this.groups) {
      this.groups = this.groupsSubject.asObservable();
    }
    return this.groups;
  }

  /**
   * Gets a single group
   * @param id The id of the group
   */
  getGroup(id: string): Observable<Group> {
    return this.getGroups()
      .map((groups) => {
        const group = groups.filter((grp) => grp.id === id)[0];
        if (!group) {
          throw new Error('Group not found!');
        }

        return group;
      });
  }

  /**
   * Delets a group
   * @param id The id to delete
   */
  deleteGroup(id: string): Observable<boolean> {
    return this.authHttp.delete(`${environment.apiUrl}/groups/${id}`)
      .map(response => response.status === 204)
      .finally(() => this.resetCache());
  }

  create(group: Group): Observable<Group> {
    return this.authHttp.post(`${environment.apiUrl}/groups`, group)
      .map(response => response.json())
      .finally(() => this.resetCache());
  }

  update(id: string, group: Group): Observable<Group> {
    return this.authHttp.put(`${environment.apiUrl}/groups/${id}`, group)
      .map(response => response.json());
  }

  /**
   * Refetches the data
   */
  private fetchData() {
    this.authHttp.get(`${environment.apiUrl}/groups`)
      .map(r => r.json())
      .subscribe(groups => this.groupsSubject.next(groups));
  }

  /**
   * Resets the cache
   */
  private resetCache() {
    this.fetchData();
  }
}
