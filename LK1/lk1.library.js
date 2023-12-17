export class Person {
  constructor(firstName, middleName, lastName, birthDate) {
    this.firstName = firstName ?? "John";
    this.middleName = middleName ?? 'Middle'
    this.lastName = lastName ?? "Doe";
    this.birthDate = birthDate ?? new Date();
  }

  age() {
    const today = new Date();
    const birthDate = new Date(this.birthDate);

    let age = today.getFullYear() - birthDate.getFullYear();

    // Noch besser als meine Lösung. 😉 Die Tests prüfen die Logik unten nicht, ist aber korrekt.
    if (today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  fullName() {
    return `${this.firstName} ${this.middleName} ${this.lastName}`;
  }
}

export class Teacher extends Person {
  constructor(firstName, middleName, lastName, birthDate, schoolName) {
    super(firstName, middleName, lastName, birthDate);
    this.schoolName = schoolName ?? "unknown";
  }

  fullName() {
    return `${super.fullName()} @ ${this.schoolName}`;
  }
}

export function getFirstAndLastLetters(test) {
  // at() gibt bereits undefined zurück. Der Fehler war, dass "first" das zweite statt das erste Element zurückgegeben hat.

  return {
    first: test.at(0),
    last: test.at(-1),
  };
}

export function getReverse(test) {
  // Geht auch mit dem Spread Operator [...test].reverse().join('')
  return Array.from(test).reverse().join('');
}

export function getCapitalized(test) {
  return test.map(t => t.toUpperCase());
}

export function getOddCapitalized(test) {
  // Geht in Ordnung. Könnte man auch mit map() machen:
  // return test.map((t, i) => (i % 2 === 1 ? t.toUpperCase() : t));

  const result = [];

  test.forEach((element, index) => {
    result.push(index % 2 !== 0 ? element.toUpperCase() : element);
  });

  return result;
}

export const getFibonacci = n => {
  if (!Number.isInteger(n) || n < 0) {
    return -1;
  }

  if (n === 0 || n === 1) {
    return n;
  }

  return getFibonacci(n - 1) + getFibonacci(n - 2);
};

export function* getFibonacciSequence() {
  let a = 0, b = 1;

  // Sehr schön! Eine sehr kompakte und nicht rekursive Lösung.
  // Man hätte auch getFibonacci() oben aufrufen können.

  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

export function getCopyOfArray(a) {
  return [...a];
}

export function getJsonWithNiceFormattingAndNoNumbers(obj) {
  return JSON.stringify(obj, (key, value) =>
      (typeof value === "number" ? undefined : value), 2);
}

export function getPropertyNames(obj) {
  return Object.keys(obj);
}

export function* getPropertyValues(obj) {
  // Geht auch mit dem Pendant zur obigen Funktion:
  // return Object.values(obj);

  for (const objKey in obj) {
    yield obj[objKey];
  }
}

export function divide(numerator, denominator) {
  if (denominator === 0) {
    throw new Error("Division by zero is not possible");
  }

  return numerator / denominator;
}

export function strictDivide(numerator, denominator) {
  if (denominator === 0) {
    throw Error("Cannot divide by zero.");
  }

  return divide(numerator, denominator);
}

export function safeDivide(numerator, denominator) {
  try {
    return strictDivide(numerator, denominator);
  } catch (error) {
    return NaN;
  }
}

export function getObjectWithAOnly(obj) {
  const { a } = obj;
  return { a };
}

export function getObjectWithAllButA(obj) {
  const { b, c } = obj;
  return { b, c };
}
