import {positionData} from './fake-data/users-data';
import {DataGeneratorInterface} from './data-generator-interface';
import {fakerUK} from '@faker-js/faker';


export default class UserGenerator implements DataGeneratorInterface {
    constructor() {}
    name() {
        return fakerUK.person.fullName();
    }
    phone() {
        return `+380 ${fakerUK.phone.number()}`;
    }
    email() {
        return fakerUK.internet.email();
    }

    photo() {
        return fakerUK.image.avatar();
    }

    positionData() {
        return positionData[Math.floor(Math.random() * positionData.length)];
    }

    generate<T>(count: number): T[] {
        return Array.from(Array(count), () => {
            const position = this.positionData();

            return {
                name: this.name(),
                phone: this.phone(),
                email: this.email(),
                position_id: position.id,
                position: position.name,
                photo: this.photo()
            } as T
        })
    }
}