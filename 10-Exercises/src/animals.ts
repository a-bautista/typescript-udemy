enum PetType { DOG="Dog", 
               CAT="Cat", 
               PARROT="Parrot" 
             }

enum AnimalGroup { MAMMAL="Mammal", 
                   BIRD="Bird", 
                   REPTILE="Reptile", 
                   AMPHIBIAN="Amphibian", 
                   FISH="Fish" 
                 }

interface Animal {
    name: string;
    classification: AnimalGroup;

    //eat(): void;
    sleep(): void;
    // hunt(): void;
    // makeNoise(): void;
}

interface Pet {
    name: string;
    age: number;
    breed: string;
    petType: PetType;

    makeNoise():void;
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
    constructor(public name: string, 
                public age: number, 
                public breed: string,
                public petType: PetType)
                {}

    makeNoise(){
        console.log("Woof! Woof!");
    }
}

class Cat implements Pet, Animal {
    constructor(public name: string, 
                public age: number, 
                public breed: string,
                public petType: PetType,
                public classification: AnimalGroup)
                {}

    makeNoise(){
        console.log("Meow! Meow!")
    }

    sleep(){
        console.log("zzz....");
    }
}

class Parrot implements Pet {
    constructor(public name: string, 
                public age: number, 
                public breed: string,
                public petType: PetType)
                {}

    makeNoise(){
        console.log("@#$%!"); // annoying noise
    }
}

class Raccoon implements Animal {
    constructor(public name: string, 
                public age: Number,
                public classification: AnimalGroup){}
    makeNoise(){
        console.log("@#$%");
    }
    sleep(){
        console.log("zzzz");
    }
}

let containerPets = new PetStore();
const doggo = new Dog("Stevie", 1, "Coltriever", PetType.DOG);
const kitty = new Cat("Money", 3, "Street cat", PetType.CAT, AnimalGroup.MAMMAL);
const parrot = new Parrot("Dundee", 33, "Yellow-headed", PetType.PARROT);
const racco = new Raccoon("Vince", 1, AnimalGroup.MAMMAL)

type AnimalPet = Cat | Dog | Parrot | Raccoon;

console.log(AnimalGroup.AMPHIBIAN);

function determinePet(animal: AnimalPet){
    if (animal instanceof Cat ){
        console.log("We have a cat named: " + animal.name);
    }else if(animal instanceof Dog){
        console.log("We have a dog named: " + animal.name);
    }else if (animal instanceof Parrot){
        console.log("We have a parrot named: " + animal.name);
    }
}

doggo.makeNoise();
containerPets.addPet(doggo);
containerPets.addPet(kitty);
containerPets.addPet(parrot);

// console.log(Object.entries(containerPets));
// Use a regular object to retrieve the objects contained in the array
// for (let i:number=1; Object.entries(containerPets); i++){
//     console.log(containerPets["pets"][i.toString()]);
// }

// containerPets.addPet(racco); this is not possible because the raccoon is an animal but not a pet

containerPets.viewPets()
determinePet(doggo);

/*
[Dog: {
  "name": "Stevie",
  "age": 1,
  "breed": "Coltriever",
  "petType": "Dog"
}, Cat: {
  "name": "Money",
  "age": 3,
  "breed": "Street cat",
  "petType": "Cat",
  "classification": "Mammal"
}, Parrot: {
  "name": "Dundee",
  "age": 33,
  "breed": "Yellow-headed",
  "petType": "Parrot"
}] 

*/