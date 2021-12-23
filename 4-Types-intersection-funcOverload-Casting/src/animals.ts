interface Pet {
    name: string;
    age: Number;
}

// generic class
class PetStore<T extends Pet>{
    private pets: T[] =[];
    addPet(pet: T){
        this.pets.push(pet);
    }

    viewPets(){
        console.log(this.pets);
    }
}

class Dog implements Pet {
    name: string;
    age: Number;
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
    age: Number;
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

class Parrot implements Pet {
    name: string;
    age: Number;
    breed: string;

    constructor(name: string, age: number, breed: string){
        this.name = name;
        this.age = age;
        this.breed = breed;
    }

    makeNoise(){
        console.log("@#$%!"); // annoying noise
    }
}

let containerPets = new PetStore();
const doggo = new Dog("Stevie", 1, "Coltriever");
const kitty = new Cat("Money", 3, "Street cat");
const parrot = new Parrot("Dundee", 33, "Yellow-headed");

containerPets.addPet(doggo);
containerPets.addPet(kitty);
containerPets.addPet(parrot);
containerPets.viewPets()