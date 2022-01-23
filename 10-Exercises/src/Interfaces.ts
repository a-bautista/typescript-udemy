import { PetType, AnimalGroup, Gender } from './Enums';

export interface Pet {
    name: string;
    age: number;
    breed: string;
    petType: PetType;

    careForOwner():void;
}

export interface Animal {
    name: string;
    classification: AnimalGroup;

    eat(): void;
    sleep(): void;
    // hunt(): void;
    // makeNoise(): void;
}

export interface Person {
    name: string;
    age: number;
    gender: Gender;
}