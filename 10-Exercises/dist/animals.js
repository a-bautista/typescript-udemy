var PetType;
(function (PetType) {
    PetType["DOG"] = "Dog";
    PetType["CAT"] = "Cat";
    PetType["PARROT"] = "Parrot";
})(PetType || (PetType = {}));
var AnimalGroup;
(function (AnimalGroup) {
    AnimalGroup["MAMMAL"] = "Mammal";
    AnimalGroup["BIRD"] = "Bird";
    AnimalGroup["REPTILE"] = "Reptile";
    AnimalGroup["AMPHIBIAN"] = "Amphibian";
    AnimalGroup["FISH"] = "Fish";
})(AnimalGroup || (AnimalGroup = {}));
// generic class
var PetStore = /** @class */ (function () {
    function PetStore() {
        this.pets = [];
    }
    PetStore.prototype.addPet = function (pet) {
        this.pets.push(pet);
    };
    PetStore.prototype.viewPets = function () {
        console.log(this.pets);
    };
    return PetStore;
}());
var Dog = /** @class */ (function () {
    function Dog(name, age, breed, petType) {
        this.name = name;
        this.age = age;
        this.breed = breed;
        this.petType = petType;
    }
    Dog.prototype.makeNoise = function () {
        console.log("Woof! Woof!");
    };
    return Dog;
}());
var Cat = /** @class */ (function () {
    function Cat(name, age, breed, petType, classification) {
        this.name = name;
        this.age = age;
        this.breed = breed;
        this.petType = petType;
        this.classification = classification;
    }
    Cat.prototype.makeNoise = function () {
        console.log("Meow! Meow!");
    };
    Cat.prototype.sleep = function () {
        console.log("zzz....");
    };
    return Cat;
}());
var Parrot = /** @class */ (function () {
    function Parrot(name, age, breed, petType) {
        this.name = name;
        this.age = age;
        this.breed = breed;
        this.petType = petType;
    }
    Parrot.prototype.makeNoise = function () {
        console.log("@#$%!"); // annoying noise
    };
    return Parrot;
}());
var Raccoon = /** @class */ (function () {
    function Raccoon(name, age, classification) {
        this.name = name;
        this.age = age;
        this.classification = classification;
    }
    Raccoon.prototype.makeNoise = function () {
        console.log("@#$%");
    };
    Raccoon.prototype.sleep = function () {
        console.log("zzzz");
    };
    return Raccoon;
}());
var containerPets = new PetStore();
var doggo = new Dog("Stevie", 1, "Coltriever", PetType.DOG);
var kitty = new Cat("Money", 3, "Street cat", PetType.CAT, AnimalGroup.MAMMAL);
var parrot = new Parrot("Dundee", 33, "Yellow-headed", PetType.PARROT);
var racco = new Raccoon("Vince", 1, AnimalGroup.MAMMAL);
console.log(AnimalGroup.AMPHIBIAN);
function determinePet(animal) {
    if (animal instanceof Cat) {
        console.log("We have a cat named: " + animal.name);
    }
    else if (animal instanceof Dog) {
        console.log("We have a dog named: " + animal.name);
    }
    else if (animal instanceof Parrot) {
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
containerPets.viewPets();
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
