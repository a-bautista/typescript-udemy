import { AnimalGroup, PetType, Gender } from './Enums';
import { Pet, Person, Animal } from './Interfaces';

export class Customer implements Person {
    
    constructor(public name: string,
                public age: number,
                public gender: Gender,
                private amountMoney: number) {}

    buyPet(quantity: number, pet: Pet, price: number){
        // verify if  cash > 0 and there's enough cash for buying the pet
        if (this.amountMoney > 0 && this.amountMoney >= price && quantity > 0){
            console.log("I have bought a " + pet.petType);
        } else {
            console.log("I am not buying a pet");
        }
    }

    getMoney(){
        return this.amountMoney
    }

    setMoney(amountMoney: number){
        this.amountMoney = amountMoney;
    }
}

export class Seller implements Person {
    constructor(public name: string,
                public age: number,
                public gender: Gender) {}

    sellPet(){}

} 

export class Cat implements Pet, Animal {
    constructor(public name: string, 
                public age: number, 
                public breed: string,
                public petType: PetType,
                public classification: AnimalGroup)
                {}

    // makeNoise(){
    //     console.log("Meow! Meow!")
    // }

    careForOwner(): void {
        
    }

    eat(){
        console.log("yum! yum! ");
    }
    sleep(){
        console.log("zzz....");
    }
}

export class Dog implements Pet {
    constructor(public name: string, 
                public age: number, 
                public breed: string,
                public petType: PetType)
                {}

    careForOwner(): void {
        
    }
    // makeNoise(){
    //     console.log("Woof! Woof!");
    // }
}



export class Parrot implements Pet {
    constructor(public name: string, 
                public age: number, 
                public breed: string,
                public petType: PetType)
                {}

    // makeNoise(){
    //     console.log("@#$%!"); // annoying noise
    // }

    careForOwner(): void {
        
    }
}

export class Raccoon implements Animal {
    constructor(public name: string, 
                public age: Number,
                public classification: AnimalGroup){}
    makeNoise(){
        console.log("@#$%");
    }
    sleep(){
        console.log("zzzz");
    }
    eat():void {
        console.log("chum! chum!");
    }
}

// generic class
export class PetStore<T extends Pet>{
    private pets: T[] =[];
    addPet(pet: T){
        this.pets.push(pet);
    }

    viewPets(){
        console.log(this.pets);
    }
}