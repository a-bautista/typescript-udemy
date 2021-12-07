// A decorator is just a function applied to a class in a certain way.
// decorators receive arguments
// The decorator executes when the class is defined not when the class is instantiated.
// Decorators allow to build new code (meta programming)

// function Logger(constructor: Function){
//     console.log('Logging...');
//     console.log(constructor);
// }

// decorator factory function
function Logger(logString: string){
    console.log('LOGGER FACTORY');
    return function(constructor: Function){
        console.log(logString);
        console.log(constructor);
    }
}

// function WithTemplate(template: string, hookId: string){
//     return function(constructor: any){
//         console.log('Rendering template');
//         const hookEl = document.getElementById(hookId);
//         const p = new constructor();
//         if (hookEl){
//             hookEl.innerHTML = template;
//             hookEl.querySelector('h1')!.textContent = p.name;
//         }
//     }
// }

function WithTemplate(template: string, hookId: string){
    console.log('TEMPLATE FACTORY');
    return function<T extends {new(... args: any[]):{name: string}}>(originalConstructor: T){
        return class extends originalConstructor {
            constructor (..._: any[]){
                super();
                console.log('Rendering template');
                const hookEl = document.getElementById(hookId);
                if (hookEl){
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    }
}

@Logger('Logging - PERSON')
@WithTemplate('<h1>My Person Object</h1>','app')
class Person {
    name = 'Max';

    constructor(){
        console.log("Creating person object ...");
    }
}

const person = new Person();
console.log(person);

function Log(target: any, propertyName: string | Symbol){
    console.log('Property decorator!');
    console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor){
    console.log('Accesor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor){
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number){
    console.log('Parameter decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}


class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price(val: number){
        if (val > 0){
            this._price = val;
        }else {
            throw new Error('Invalid price - should be positive!');
        }  
    }

    constructor(t: string, p:number){
        this.title = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number){
        return this._price * (1+ tax);
    };
}

interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[];
    }
}

// decorators for validation
const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string){
    registeredValidators[target.constructor.name] = {
        [propName]: ['required']
    }
}

function PositiveNumber(target: any, propName: string){
    registeredValidators[target.constructor.name] = {
        [propName]: ['positive']
    }
}



class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p:number){
        this.title = t;
        this.price = p;
    }
}



const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event =>{
    event.preventDefault();
    const mainTitle = document.getElementById('title') as HTMLInputElement;
    const mainPrice = document.getElementById('price') as HTMLInputElement;

    const title = mainTitle.value;
    const price = +mainPrice.value;
    const createdCourse = new Course(title, price);

    console.log(createdCourse);

})
