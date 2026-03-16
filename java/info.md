# 1. Lexical Scope

- Definition: Lexical scope (also called static scope) means that the scope of a variable is determined by its position in the source code.
- Behavior: Inner functions can access variables defined in their outer functions, but outer functions cannot access variables defined inside inner functions.
- Example:
  function outer() {
  let x = 10;
  function inner() {
  console.log(x); // ✅ Accessible due to lexical scope
  }
  inner();
  }
  outer();

# 2. Block Scope

- Definition: Variables declared with let and const are block-scoped, meaning they are only accessible within the { ... } block in which they are defined.
- Difference from var: var is function-scoped, so it ignores block boundaries.
- Example:
  if (true) {
  let a = 5;
  const b = 10;
  var c = 15;
  }
  console.log(c); // ✅ Works (function-scoped)
  console.log(a); // ❌ ReferenceError (block-scoped)
  console.log(b); // ❌ ReferenceError (block-scoped)

# 3. Temporal Dead Zone (TDZ)

- Definition: The TDZ is the period between entering a scope and the actual variable declaration where accessing the variable results in a ReferenceError.
- Cause: let and const are hoisted but not initialized, unlike var which is hoisted and initialized to undefined.
- Example:
  console.log(x); // ❌ ReferenceError (TDZ)
  let x = 20;
  console.log(x); // ✅ 20
  console.log(y);//undefine
  var y = 30;
  console.log(y);// ✅ 30

# 🔑 Key Takeaways

- Lexical Scope: Scope is determined by code structure, not runtime calls.
- Block Scope: let and const restrict variables to the block they are declared in.
- TDZ: Prevents use of let/const variables before declaration, ensuring safer code.
