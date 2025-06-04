# When and where to use unkown ?

## intro

For the few cases where you have a value whose type you really don’t know ahead of time, don’t use any, and instead reach for unknown. Like any, it represents any value, but TypeScript won’t let you use an unknown type until you refine it by checking what it is

### Example

```
let a: unknown = 30 // unknown
let b = a === 123 // boolean
let c = a + 10 // Error TS2571: Object is of type 'unknown'.
if (typeof a === 'number') {
  let d = a + 10 // number
}
```

<p>
TypeScript will never infer something as unknown—you have to explicitly annotate it. You can compare values to values that are of type unknown. But, you can’t do things that assume an unknown value is of a specific type (c);
you have to prove to TypeScript that the value really is of that type first (d).
</p>
