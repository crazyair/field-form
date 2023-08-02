type BaseNamePath = string | number | boolean | (string | number | boolean)[];
/**
 * Store: The store type from `FormInstance<Store>`
 * ParentNamePath: Auto generate by nest logic. Do not fill manually.
 */
export type DeepNamePath<
  Store = any,
  ParentNamePath extends any[] = [],
> = ParentNamePath['length'] extends 10
  ? never
  : // Follow code is batch check if `Store` is base type
  true extends (Store extends BaseNamePath ? true : false)
  ? ParentNamePath['length'] extends 0
    ? Store | BaseNamePath // Return `BaseNamePath` instead of array if `ParentNamePath` is empty
    : Store extends any[]
    ? readonly [...ParentNamePath, number] // Connect path
    : never
  : Store extends any[] // Check if `Store` is `any[]`
  ? // Connect path. e.g. { a: { b: string }[] }
    // Get: [a] | [ a,number] | [ a ,number , b]
    readonly [...ParentNamePath, number] | DeepNamePath<Store[number], [...ParentNamePath, number]>
  : {
      // Convert `Store` to <key, value>. We mark key a `FieldKey`
      [FieldKey in keyof Store]: Store[FieldKey] extends Function
        ? never
        :
            | (ParentNamePath['length'] extends 0 ? FieldKey : never) // If `ParentNamePath` is empty, it can use `FieldKey` without array path
            | readonly [...ParentNamePath, FieldKey] // Exist `ParentNamePath`, connect it
            | DeepNamePath<Required<Store>[FieldKey], [...ParentNamePath, FieldKey]>; // If `Store[FieldKey]` is object
    }[keyof Store];

export type Demo<
  T = any,
  T1 extends readonly any[] = [],
  T2 extends readonly any[] = [],
> = T2['length'] extends T1['length'] ? T : Demo<T[T1[T2['length']]], T1, [...T2, true]>;

type ddd<T = any> = DeepNamePath<T>;

function func<T = any, const T1 extends ddd<T> = ddd<T>>(
  data: T,
  params: T1,
): T1 extends readonly any[] ? Demo<T, T1> : Demo<T, [T1]>;

function func(...e: any[]) {
  return e;
}

export const d = func({ a: 1, b: '' }, ['a']);

export const d1 = func({ a: 1, b: '' }, 'a');

export const d2 = func({ a: 1, b: '' }, ['b']);

export const d3 = func({ a: { a1: ['aa'] }, b: '' }, ['a', 'a1', 1]);
