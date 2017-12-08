import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BaseModel } from 'app/shared/base/basemodel.class';

export abstract class BaseCrudService<T extends BaseModel> {
  /**
   * The resource for this service
   */
  protected resource: string;

  /**
   * The http lib to use for authenticated calls
   */
  protected authHttp: AuthHttp;

  /**
   * Subject used for caching
   */
  private cacheSubject = new BehaviorSubject<T[]>([]);

  /**
   * The items observable
   */
  private items: Observable<Array<T>>;

  constructor(resource: string, authHttp: AuthHttp) {
    this.authHttp = authHttp;

    this.resource = resource;

    this.fetchData();
  }

  /**
   * Gets all the T
   */
  public getAll(): Observable<Array<T>> {
    if (!this.items) {
      this.items = this.cacheSubject.asObservable();
    }
    return this.items;
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
    return this.authHttp.delete(`${environment.apiUrl}/${this.resource}/${id}`)
      .map(response => response.status === 204)
      .finally(() => this.resetCache());
  }

  /**
   * Creates a new T
   * @param item The item to save
   */
  public create(item: T): Observable<T> {
    return this.authHttp.post(`${environment.apiUrl}/${this.resource}`, item)
      .map(response => response.json())
      .finally(() => this.resetCache());
  }

  /**
   * Updates an item
   * @param id The id of the T
   * @param item The updated props
   */
  public update(id: string, item: T): Observable<T> {
    return this.authHttp.put(`${environment.apiUrl}/${this.resource}/${id}`, item)
      .map(response => response.json());
  }

  /**
   * Refetches the data
   */
  protected fetchData() {
    this.authHttp.get(`${environment.apiUrl}/${this.resource}`)
      .map(r => r.json())
      .subscribe(items => this.cacheSubject.next(items));
  }

  /**
   * Resets the cache
   */
  protected resetCache() {
    this.fetchData();
  }
}
