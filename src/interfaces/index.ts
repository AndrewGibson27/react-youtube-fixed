// https://stackoverflow.com/questions/41017287/cannot-use-new-with-expression-typescript
// eslint-disable-next-line import/prefer-default-export
export interface Constructable<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
}
