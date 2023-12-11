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
  return {
    first: test.length > 0 ? test.charAt(0) : undefined,
    last: test.length > 0 ? test.charAt(test.length - 1) : undefined
  };
}

export function getReverse(test) {
  return Array.from(test).reverse().join('');
}

export function getCapitalized(test) {
  return test.map(t => t.toUpperCase());
}

export function getOddCapitalized(test) {
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
