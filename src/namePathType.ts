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
  true extends (Store extends string | number | boolean ? true : false)
  ? ParentNamePath['length'] extends 0
    ? Store // Return `string | number | boolean` instead of array if `ParentNamePath` is empty
    : never
  : true extends (Store extends (string | number | boolean)[] ? true : false)
  ? ParentNamePath['length'] extends 0
    ? Store // Return `(string | number | boolean)[]` instead of array if `ParentNamePath` is empty
    : [...ParentNamePath, number] // Connect path
  : Store extends any[] // Check if `Store` is `any[]`
  ? // Connect path. e.g. { a: { b: string }[] }
    // Get: [a] | [ a,number] | [ a ,number , b]
    [...ParentNamePath, number] | DeepNamePath<Store[number], [...ParentNamePath, number]>
  : {
      // Convert `Store` to <key, value>. We mark key a `FieldKey`
      [FieldKey in keyof Store]: Store[FieldKey] extends Function
        ? never
        :
            | (ParentNamePath['length'] extends 0 ? FieldKey : never) // If `ParentNamePath` is empty, it can use `FieldKey` without array path
            | [...ParentNamePath, FieldKey] // Exist `ParentNamePath`, connect it
            | DeepNamePath<Required<Store>[FieldKey], [...ParentNamePath, FieldKey]>; // If `Store[FieldKey]` is object
    }[keyof Store];
