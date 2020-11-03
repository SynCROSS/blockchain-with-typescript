// const name = 'SynCROSS',
//   age = 18,
//   gender = 'male';
interface Human {
  name: string;
  age: number;
  gender: string;
}

const person = {
  name: 'SynCROSS',
  age: 18,
  gender: 'male',
};
const sayHi = (person: Human): void => {
  console.log(
    `My Name is ${person.name}, age is ${person.age}, gender is ${person.gender}.`,
  );
};
sayHi(person);

export {}; // * export on TS
