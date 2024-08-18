import "@total-typescript/ts-reset";

declare global {
  // Override the types for Object.keys() and Object.entries() to be more
  // helpful in cases where the keys are of a known set.
  interface ObjectConstructor {
    new (value?: unknown): object & Record<PropertyKey, unknown>;
    (value?: unknown): object & Record<PropertyKey, unknown>;

    keys<T>(
      o: T,
    ): T extends Record<string, unknown>
      ? Array<keyof T & string>
      : Array<string>;

    entries<T>(
      o: T,
    ): T extends Record<string, infer U>
      ? Array<[keyof T & string, U]>
      : T extends ArrayLike<infer U>
        ? Array<[string, U]>
        : Array<[string, unknown]>;
  }
}
