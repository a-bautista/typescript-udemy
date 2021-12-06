// an interface defines a structure of an object and it is used instead of abstract classes
// you can inherit from multiple interfaces whereas with classes you can only inherit from one class
// interfaces define the structure of an object or a function
interface AddFn {
  (a: number, b: number): number;
} 

let add: AddFn;

interface Greetable {
  name?: string;
  greet(phrase: string): void;
}

class Person implements Greetable{
  name?: string;
  age = 30;

  constructor(n?: string){
    if (n){
      this.name = n;
    }
  }

  greet(phrase: string){
    if (this.name){
      console.log(phrase + ' ' + this.name);
    }else{
      console.log('Hi!');
    }
  }
}

let user1: Greetable;
user1 = new Person();

// user1 = {
//   age: 31,
//   greet(phrase: string) {
//     console.log(phrase + ' ' + this.name);
//   }
// };

user1.greet(`Hi there - I am`);
console.log(user1);