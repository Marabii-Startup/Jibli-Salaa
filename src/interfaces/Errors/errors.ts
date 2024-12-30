// Simplified Flatten type that flattens up to two levels
type Flatten<T, Prefix extends string = ""> =
  // Top-level keys
  | `${Prefix}${Extract<keyof T, string>}`
  // Second-level keys for object properties
  | {
      [K in keyof T]: T[K] extends object
        ? `${Prefix}${Extract<K, string>}.${Extract<keyof T[K], string>}`
        : never;
    }[keyof T];

// Simplified Errors type using the two-level Flatten
export type Errors<T> = Partial<Record<Flatten<T>, string>> & {
  global?: string;
};
