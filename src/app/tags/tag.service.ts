import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable, EventEmitter } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BaseModel } from 'app/shared/base/basemodel.class';

@Injectable()
export class TagService {
  /**
   * tags observable
   */
  private tags$: Observable<Array<string>>;

  /**
   * The tags
   */
  private tags: Array<string>;

  constructor(private authHttp: AuthHttp) {
  }

  /**
   * Gets all the tags
   */
  public getAll(): Observable<Array<string>> {
    if (this.tags) {
      return Observable.of(this.tags);
    } else if (this.tags$) {
      return this.tags$;
    } else {
      this.tags$ = this.authHttp.get(`${environment.apiUrl}/tags`)
        .map(r => r.json())
        .map(response => {
          // when the cached data is available we don't need the `Observable` reference anymore
          this.tags$ = null;
          this.tags = response;
          return this.tags;
        })
        .share();

      return this.tags$;
    }
  }

  /**
   * Resets the cache
   */
  public resetCache() {
    this.tags$ = null;
    this.tags = null;
  }
}
