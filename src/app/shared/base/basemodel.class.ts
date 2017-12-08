export abstract class BaseModel {
  public static resource: string;

  public id: string;

  constructor(id?: string) {
    this.id = id;
  }
}
