/**
 * T：泛型
 * T1：缓存上一次的 name list
 */
export type DeepNamePath<T = any, T1 extends any[] = []> = any extends T
  ? Record<string, any> extends T
    ? T
    : T extends string | number | (string | number)[]
    ? T
    : never
  : {
      [P in keyof Required<T>]:
        | (T1['length'] extends 0 ? P | [...T1, P] : never)
        | (Required<T>[P] extends any[]
            ?
                | ([...T1, P] | [...T1, P, number])
                | (Required<T>[P] extends (string | number)[]
                    ? never
                    : DeepNamePath<Required<T>[P][number], [...T1, P, number]>)
            : Required<T>[P] extends Record<string, any>
            ? [...T1, P] | DeepNamePath<Required<T>[P], [...T1, P]>
            : [...T1, P]);
    }[keyof T];
