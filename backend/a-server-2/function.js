

// Finds the first object in the array that matches a given key-value pair.
function findObject(arr, key, value) {
  if (!Array.isArray(arr)) {
    throw new Error("First argument must be an array");
  }
  return arr.find((obj) => obj[key] === value) || null;
}

/*********/
// Function to check if key-value exists in an array of objects
function hasKeyValue(arr, key, value) {
  if (!Array.isArray(arr)) {
    throw new Error("First argument must be an array");
  }
  return arr.some((obj) => obj[key] === value);
}
//example usage
//console.log(hasKeyValue(users, "name", "Bob")); // true
//console.log(hasKeyValue(users, "name", "David")); // false
/*********/

module.exports = findObject;
module.exports = hasKeyValue;
