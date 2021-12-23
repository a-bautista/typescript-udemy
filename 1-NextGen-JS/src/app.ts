
/* 

let vs var

  What's the difference between var and let?
  var only works in global scope and function scope
  if (age > 20) {
      var isOld = true
  }
  console.log(isOld);

  The code from above will work because we defined isOld inside of the function scope but at the same time, it will print
  at the global scope because var works for both. 
*/

// arrow function
const add = (a:number, b: number) => {
    return a + b;
}

// arrow function upgraded: you don't have to specify the return keyword
const add_improved = (a: number, b:number) => a + b;
const printOutput = (output: string | number ) => console.log(output);
const button = document.querySelector('button');

console.log(add(2,9));
console.log(add_improved(10,20));
printOutput(10);

if (button){
    button.addEventListener('click', event => console.log(event));
}

const hobbies = ['Sports', 'Sailing'];
const activeHobbies = ['Parcours'];

// insert into the activeHobbies array the hobbies
activeHobbies.push(hobbies[0]); // normal way of inserting objects
// activeHobbies.push(...hobbies);
console.log(activeHobbies);

const Person = {
    name: 'Max',
    age: 30
}

const copiedPerson = {...Person};

// accept an array of numbers and add on top of each one the value
const addMultiple = (...numbers: number[]) => {
      return numbers.reduce((curResult, curValue) => {
          return curResult + curValue;
      }, 0);
}

const addedNumbers = addMultiple(5, 10, 15, 20);
console.log(addedNumbers);

const [hobby1] = hobbies;
console.log(hobby1);