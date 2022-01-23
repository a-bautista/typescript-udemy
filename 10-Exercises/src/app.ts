import { PetType, AnimalGroup, Gender } from './Enums';
import { Customer, Cat, Dog, Parrot, Raccoon, PetStore } from './Classes';

// intersection
// type ElevatedEmployee = Admin & Employee;

let containerPets = new PetStore();

// pets
const doggo = new Dog("Stevie", 1, "Coltriever", PetType.DOG);
const doggo2 = new Dog("Marley", 2, "Beagle", PetType.DOG);
const doggo3 = new Dog("Dasha", 4, "Street dog", PetType.DOG);

const kitty = new Cat("Money", 3, "Street cat", PetType.CAT, AnimalGroup.MAMMAL);
const kitty2 = new Cat("Letty", 5, "American Ringtail", PetType.CAT, AnimalGroup.MAMMAL);


const parrot = new Parrot("Dundee", 33, "Yellow-headed", PetType.PARROT);

// animals
const racco = new Raccoon("Vince", 1, AnimalGroup.MAMMAL)

// customer
const customer1 = new Customer("Jay", 26, Gender.MALE, 5000);
const customer2 = new Customer("Roberto", 98, Gender.MALE, 2000000);
const customer3 = new Customer("Roberta", 26, Gender.FEMALE, 300);

// 
// const e1: Employee = {
//     name: 'Jeremy',
//     startDate: new Date()
// }

// initializer
containerPets.addPet(doggo);
containerPets.addPet(doggo2);
containerPets.addPet(doggo3);
containerPets.addPet(kitty);
containerPets.addPet(kitty2);
containerPets.addPet(parrot);

// containerPets.addPet(racco); this is not possible because the raccoon is an animal but not a pet
containerPets.viewPets()
determinePet(doggo);

// transactions
customer1.buyPet(1, doggo, 100);

type AnimalPet = Cat | Dog | Parrot | Raccoon;

function determinePet(animal: AnimalPet){
    if (animal instanceof Cat ){
        console.log("We have a cat named: " + animal.name);
    }else if(animal instanceof Dog){
        console.log("We have a dog named: " + animal.name);
    }else if (animal instanceof Parrot){
        console.log("We have a parrot named: " + animal.name);
    }
}



// console.log(Object.entries(containerPets));
// Use a regular object to retrieve the objects contained in the array
// for (let i:number=1; Object.entries(containerPets); i++){
//     console.log(containerPets["pets"][i.toString()]);
// }


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