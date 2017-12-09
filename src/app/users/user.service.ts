import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { User } from '../shared/user.model';
import { BaseCrudService } from '../shared/base/basecrudservice.class';

@Injectable()
export class UserService extends BaseCrudService<User> {

  constructor(authHttp: AuthHttp) {
    super(authHttp);
  }

  public create(item: User): Observable<User> {
    return this.authHttp.post(`${environment.apiUrl}/${this.getResourceUrl()}/register`, item)
      .map(r => r.json())
      .finally(() => this.resetCache());
  }

  protected getResourceUrl(): string {
    return 'users';
  }
}
