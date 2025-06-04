# Quick Notes

## Number

Number is the set of all numbers: integers, floats, positives, negatives, Infinity, NaN, and so on. Numbers can do, well, numbery things, like addition (+), subtraction (-), modulo (%), and comparison (<).

## Primitives in JS/TS

In JavaScript, a primitive (primitive value, primitive data type) is data that is not an object and has no methods or properties. There are 7 primitive data types: <br/> <br/>string, number, bigint, boolean, undefined, symbol and null. <br/><br/>All primitives are immutable; that is, they cannot be altered. It is important not to confuse a primitive itself with a variable assigned a primitive value. The variable may be reassigned to a new value, but the existing value can not be changed in the ways that objects, arrays, and functions can be altered. The language does not offer utilities to mutate primitive values. Primitives have no methods but still behave as if they do. When properties are accessed on primitives, JavaScript auto-boxes the value into a wrapper object and accesses the property on that object instead. For example, "foo".includes("f") implicitly creates a String wrapper object and calls String.prototype.includes() on that object. This auto-boxing behavior is not observable in JavaScript code but is a good mental model of various behaviors — for example, why "mutating" primitives does not work (because str.foo = 1 is not assigning to the property foo of str itself, but to an ephemeral wrapper object).

## Object.seal(...) and Object.freeze(...)

In JavaScript, `Object.seal()` is used to restrict modifications to an object’s structure — it prevents **adding or deleting properties**, but still allows **changing the values** of existing ones. However, it is **not recursive**; sealing an object does **not** seal its nested objects — you must apply `Object.seal()` manually or via a **recursive function** for deeper levels.

For example, if you seal an object with nested objects inside, you can still modify those nested properties unless they are sealed individually.

Similarly, `Object.freeze()` makes an object completely **immutable** at the top level, preventing **addition, deletion, and value updates** of its properties. Like `seal()`, `freeze()` is also **shallow by default** — nested objects remain mutable unless **recursively frozen** using a utility function.

To make an object fully sealed or frozen, including its nested levels, you need to write or use a **deep sealing/freezing function** that traverses and applies the method to each nested object.

Also, note that both `seal` and `freeze` work only on **objects** — if you try to seal or freeze a **primitive value** like a string or number, it has **no effect**.

##
