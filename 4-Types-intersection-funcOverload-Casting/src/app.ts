type Admin = {
    name: string,
    privileges: string[]
};

type Employee = {
    name: string,
    startDate: Date;
};

// intersection
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()   
};

// union = string or number
type Combinable = string | number;
type Numeric = number | boolean;

// intersection
type Universal = Combinable & Numeric;

// function overload
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: Combinable, b: Combinable) {
    // type guard
    // if 'a' or 'b' is of type string then convert the result to string
    if (typeof a === 'string' || typeof b === 'string'){
        return a.toString() + b.toString();
    }
    return a + b;
}


const result = add('Alejandro', ' Ramos');
// result.split() is not possible because the function add only knows that a string or number is accepted but it is not defined at the end
// result.split()

const fetchedUserData = {
    id: 'u1',
    name: 'Max',
    job: {
        title: 'CEO',
        description: 'My own company'
    }
};

// ? indicates to chain the next element in case job exists
console.log(fetchedUserData?.job?.title);

const userInput = undefined;

// if userInput is undefined then do the fallback and use 'DEFAULT'
const storedData = userInput ?? 'DEFAULT';

console.log(storedData);

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee){
    console.log('Name:' + emp.name);
    if ('privileges' in emp){
        console.log('Privileges: ' + emp.privileges);
    }
    if ('startDate' in emp){
        console.log('StartDate: ' + emp.startDate);
    }
}

printEmployeeInformation({name: 'Emily', startDate: new Date()});

class Car {
    drive() {
        console.log('Driving a car ...');
    }
}

class Truck {
    drive(){
        console.log('Driving a truck ...');
    }

    loadCargo(amount: number){
        console.log('Loading cargo ... ' + amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function usedVehicle(vehicle: Vehicle){
    vehicle.drive();
    // if ('loadCargo' in vehicle){
    //     vehicle.loadCargo(10000);
    // }
    if (vehicle instanceof Truck){
        vehicle.loadCargo(10000);
    }
}

usedVehicle(v1);
usedVehicle(v2);

// interfaces
interface Bird {
    type: 'bird'; // discriminated union
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

// ========================================

type Animal = Bird | Horse;

function moveAnimal(animal: Animal){
    // the code from below works but it is inefficient because I am hard coding the flying speed
    // if ('flyingSpeed' in animal){
    //     console.log('Moving with speed: '+ animal.flyingSpeed);
    // }
    let speed;
    switch(animal.type){
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log(animal.type +' is moving at speed: ' + speed);
}

// type casting
// ! means will never yield null
const userInputElement = <HTMLInputElement>document.getElementById('user-input')!

if (userInputElement){
    (userInputElement as HTMLInputElement).value = 'Hi there!';
}

moveAnimal({type: 'bird', flyingSpeed: 10})

interface ErrorContainer {
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email!',
    username: 'Must start with a capital character!'
}

interface Pet {
    name: string;
    age: Number;
    breed: string;

    makeNoise(): void;
}

class Dog implements Pet {
    name: string;
    age: number;
    breed: string;

    constructor(name: string, age: number, breed: string){
        this.name = name;
        this.age = age;
        this.breed = breed;
    }

    makeNoise(){
        console.log("Woof! Woof!");
    }
}


class Cat implements Pet {
    name: string;
    age: number;
    breed: string;

    constructor(name: string, age: number, breed: string){
        this.name = name;
        this.age = age;
        this.breed = breed;
    }

    makeNoise(){
        console.log("Meow! Meow!")
    }
}

const cat1 = new Cat("Micho", 10, "Callejero");
const dog1 = new Dog("Buffy", 9, "Cocker Spaniel");

type TypePet = Dog | Cat;

function makeNoise(typePet: TypePet){
    if (typePet instanceof Dog ){
        console.log("We have this dog: " + typePet.name);
    }
    else if (typePet instanceof Cat){
        console.log("We have this cat: " + typePet.name);
    }
}

makeNoise(cat1);
makeNoise(dog1);