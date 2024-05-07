export class User {
  private _incrementId: number | undefined;

  constructor(private _id: string, private _name: string) {
    if (!_id) {
      throw new Error("Id is required");
    }
    if (!_name) {
      throw new Error("Name is required");
    }
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get incrementId(): number | undefined {
    return this._incrementId;
  }
}
