# Experiments

## Assigning object as key in object

```

let i = {
  10: "akkkdkd",
};
const p = {
  [i]: 888,
  10:44,
};
console.log(p["[object Object]"]);
// output is 888 wtf
console.log(p[10]);
```
