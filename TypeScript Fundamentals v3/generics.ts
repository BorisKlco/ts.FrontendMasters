//Dictionary map, filter and reduce

function assertEquals<T>(found: T, expected: T, message: string) {
  if (found !== expected)
    throw new Error(
      `❌ Assertion failed: ${message}\nexpected: ${expected}\nfound: ${found}`
    );
  console.log(`✅ OK ${message}`);
}

function assertOk(value: any, message: string) {
  if (!value) throw new Error(`❌ Assertion failed: ${message}`);
  console.log(`✅ OK ${message}`);
}

//
const fruits = {
  apple: { color: "red", mass: 100 },
  grape: { color: "red", mass: 5 },
  banana: { color: "yellow", mass: 183 },
  lemon: { color: "yellow", mass: 80 },
  pear: { color: "green", mass: 178 },
  orange: { color: "orange", mass: 262 },
  raspberry: { color: "red", mass: 4 },
  cherry: { color: "red", mass: 5 },
};

interface Dict<T> {
  [k: string]: T;
}

// Array.prototype.map, but for Dict
function mapDict<T, U>(
  input: Dict<T>,
  mappingCb: (arg: T, key: string) => U
): Dict<U> {
  const returnV: Dict<U> = {};

  for (let key in input) {
    const thisV = input[key];
    returnV[key] = mappingCb(thisV, key);
  }
  return returnV;
}

// Array.prototype.filter, but for Dict
function filterDict<T>(input: Dict<T>, filterCb: (arg: T) => boolean): Dict<T> {
  const returnV: Dict<T> = {};

  for (let key in input) {
    const thisV = input[key];
    if (filterCb(thisV)) {
      returnV[key] = thisV;
    }
  }
  return returnV;
}
// Array.prototype.reduce, but for Dict
function reduceDict<T, V>(
  input: Dict<T>,
  reducer: (currentV: V, item: T) => V,
  initV: V
): V {
  let returnV = initV;

  for (let key in input) {
    const thisV = input[key];
    returnV = reducer(returnV, thisV);
  }
  return returnV;
}

// MAP
const fruitsWithKgMass = mapDict(fruits, (fruit, name) => ({
  ...fruit,
  kg: 0.001 * fruit.mass,
  name,
}));
const lemonName: string = fruitsWithKgMass.lemon.name;
// @ts-ignore-error
const failLemonName: number = fruitsWithKgMass.lemon.name;
assertOk(fruitsWithKgMass, "[MAP] mapDict returns something truthy");
assertEquals(
  fruitsWithKgMass.cherry.name,
  "cherry",
  '[MAP] .cherry has a "name" property with value "cherry"'
);
assertEquals(
  fruitsWithKgMass.cherry.kg,
  0.005,
  '[MAP] .cherry has a "kg" property with value 0.005'
);
assertEquals(
  fruitsWithKgMass.cherry.mass,
  5,
  '[MAP] .cherry has a "mass" property with value 5'
);
assertEquals(
  Object.keys(fruitsWithKgMass).length,
  8,
  "[MAP] fruitsWithKgMass should have 8 keys"
);

// FILTER
// only red fruits
const redFruits = filterDict(fruits, (fruit) => fruit.color === "red");
assertOk(redFruits, "[FILTER] filterDict returns something truthy");
assertEquals(
  Object.keys(redFruits).length,
  4,
  "[FILTER] 4 fruits that satisfy the filter"
);
assertEquals(
  Object.keys(redFruits).sort().join(", "),
  "apple, cherry, grape, raspberry",
  '[FILTER] Keys are "apple, cherry, grape, raspberry"'
);

// REDUCE
// If we had one of each fruit, how much would the total mass be?
const oneOfEachFruitMass = reduceDict(
  fruits,
  (currentMass, fruit) => currentMass + fruit.mass,
  0
);
assertOk(redFruits, "[REDUCE] reduceDict returns something truthy");
assertEquals(
  typeof oneOfEachFruitMass,
  "number",
  "[REDUCE] reduceDict returns a number"
);
assertEquals(
  oneOfEachFruitMass,
  817,
  "[REDUCE] 817g mass if we had one of each fruit"
);