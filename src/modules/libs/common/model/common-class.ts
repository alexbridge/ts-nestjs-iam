export abstract class CommonClass<T> {
  constructor(values: { [k in keyof T]?: T[k] } = null) {
    values && Object.assign(this, values);
  }
}
