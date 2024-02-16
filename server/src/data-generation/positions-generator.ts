import { names } from './fake-data/positions-data';
import {DataGeneratorInterface, GenerateReturnType} from './data-generator-interface';
import {Position} from '@prisma/client';

export default class PositionsGenerator implements DataGeneratorInterface {
    constructor() {}
    name(index: number) {
        return names[index];
    }
    generate<T>(count: number): T[] {
        return Array.from(Array(count), (element, index) => {
            return {
                name: this.name(index),
            } as T;
        })
    }
}