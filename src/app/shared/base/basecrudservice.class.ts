import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable, EventEmitter } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BaseModel } from 'app/shared/base/basemodel.class';

export abstract class BaseCrudService<T extends BaseModel> {
  /**
   * The http lib to use for authenticated calls
   */
  protected authHttp: AuthHttp;

  protected onChange: EventEmitter<void>;

  /**
   * Items observable
   */
  private items$: Observable<Array<T>>;

  /**
   * The items
   */
  private items: Array<T>;

  constructor(authHttp: AuthHttp) {
    this.authHttp = authHttp;

    this.onChange = new EventEmitter();
  }

  /**
   * Gets the on change event emitter
   */
  public getOnChangeEvent(): Observable<void> {
    return this.onChange.asObservable();
  }

  /**
   * Gets all the T
   */
  public getAll(): Observable<Array<T>> {
    if (this.items) {
      return Observable.of(this.items);
    } else if (this.items$) {
      return this.items$;
    } else {
      this.items$ = this.authHttp.get(`${environment.apiUrl}/${this.getResourceUrl()}`)
        .map(r => r.json())
        .map(response => {
          // when the cached data is available we don't need the `Observable` reference anymore
          this.items$ = null;
          this.items = response;
          return this.items;
        })
        .share();

      return this.items$;
    }
  }

  /**
   * Gets a single T
   * @param id The id of the T
   */
  public get(id: string): Observable<T> {
    return this.getAll()
      .map((items) => {
        const item = items.filter((element) => element.id === id)[0];
        if (!item) {
          throw new Error('Item not found');
        }

        return item;
      });
  }

  /**
   * Delets a T
   * @param id The id to delete
   */
  public delete(id: string): Observable<boolean> {
    return this.authHttp.delete(`${environment.apiUrl}/${this.getResourceUrl()}/${id}`)
      .map(response => response.status === 204)
      .finally(() => this.resetCache());
  }

  /**
   * Creates a new T
   * @param item The item to save
   */
  public create(item: T): Observable<T> {
    return this.authHttp.post(`${environment.apiUrl}/${this.getResourceUrl()}`, item)
      .map(response => response.json())
      .finally(() => this.resetCache());
  }

  /**
   * Updates an item
   * @param id The id of the T
   * @param item The updated props
   */
  public update(id: string, item: T): Observable<T> {
    return this.authHttp.put(`${environment.apiUrl}/${this.getResourceUrl()}/${id}`, item)
      .map(response => response.json());
  }

  /**
   * Resets the cache
   */
  protected resetCache() {
    this.items$ = null;
    this.items = null;

    this.onChange.emit();
  }

  /**
   * Gets the resource URl
   */
  protected abstract getResourceUrl(): string;
}
