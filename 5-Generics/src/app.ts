// const names: Array<string> = []; // string[]
// // names[0].split(' ');

// const promise: Promise<number> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(10);
//   }, 2000);
// });

// promise.then(data => {
//   // data.split(' ');
// })


// function merge(objectA: object, objectB: object){
//   return Object.assign(objectA, objectB);
// }

//======================= Generic functions =============================
// generics indicate that we will get different type data
// extends is a constraint that can indicate which properties can be passed
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
console.log(mergedObj.age);

// the function implements an interface which is assigned to the parameter, so Typescript can use the length property
interface Lengthy {
  length: number
}

// [T, string] indicates the return type
function countAndDescribe<T extends Lengthy>(element: T): [T, string]{
  let descriptionText = 'Got no value';
  if (element.length > 0 && element.length < 2){
    descriptionText = 'Got 1 element';
  }else if(element.length >=2){
    descriptionText = 'Got ' + element.length + ' elements.';
  }
  return [element, descriptionText];
}

console.log(countAndDescribe(['Sports', 'Cooking!', 'New']));

// I indicate that U can use a property from T, in this case the key value
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U)
  {
    return 'Value: ' + obj[key]
  }

let res = extractAndConvert({name:'Max'}, 'name');
console.log(res);

//======================= Generic classes =============================

// this class is a generic which has any type value string T (in this case, string, number or boolean). These values are not mixed.

class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T){
      this.data.push(item);
    }

    removeItem(item: T){
      // in case you have an object
      if (this.data.indexOf(item) === -1){
        return;
      }
      this.data.splice(this.data.indexOf(item),1);
    }

    getItems(){
      return [...this.data];
    }
}


// class DataStorage2 {
//   private data: string[] | number[] | boolean[] = []; // this indicates that data can contain mixed arrays

//   addItem(item: string[] | number[] | boolean[]){
//     this.data.push(item);
//   }

//   removeItem(item: string[] | number[] | boolean[]){
//     // in case you have an object
//     if (this.data.indexOf(item) === -1){
//       return;
//     }
//     this.data.splice(this.data.indexOf(item),1);
//   }

//   getItems(){
//     return [...this.data];
//   }
// }


const textStorage = new DataStorage<string>();
textStorage.addItem('Alejandro');
textStorage.addItem('Orlando');
console.log(textStorage.getItems());


const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// objStorage.addItem({name: 'Esteban'});
// objStorage.addItem({name: 'Ulises'});
// const removeItem = {name: 'Esteban'};

// // if you want to remove the object {name: 'Esteban'} then you need to explicitly send this into the remove function of the class
// objStorage.removeItem(removeItem);

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

const names: Readonly<string[]> = ['Jeremy', 'Pamela'];
// not possible
//names.push('Hannah');