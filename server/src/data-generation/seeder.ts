import prisma from '../services/prisma';
import {DataGeneratorInterface} from './data-generator-interface';
import UserGenerator from './user-generator';
import PositionsGenerator from './positions-generator';
import {Position, User} from '@prisma/client';


export default class Seeder {
    async seedUsers(dataGenerator: DataGeneratorInterface, amountOfData: number) {
        try {
            const entities = dataGenerator.generate<Omit<User, 'id' | 'registration_timestamp'>>(amountOfData);
            const batchUsersUpsert = entities.map((entity, idx) => {
                return prisma.user.upsert({
                    where: {
                        id: idx + 1
                    },
                    create: entity,
                    update: entity
                });
            });

            await prisma.$transaction(batchUsersUpsert);

            console.log('Users seeding finished successfully.');
        } catch (error) {
            console.error('Error seeding users:', error);
        }
    }

    async seedPosition(dataGenerator: DataGeneratorInterface, amountOfData: number) {
        try {
            const entities = dataGenerator.generate<Omit<Position, 'id'>>(amountOfData);
            const batchUsersUpsert = entities.map((entity, idx) => prisma.position.upsert({
                where: {
                    id: idx + 1
                },
                create: entity,
                update: entity
            }));

            await prisma.$transaction(batchUsersUpsert);
            console.log('Position seeding finished successfully.');
        } catch (error) {
            console.error('Error seeding positions:', error);
        }
    }
}

const seeder = new Seeder();
const userDataGenerator = new UserGenerator();
const positionsDataGenerator = new PositionsGenerator();

seeder.seedPosition(positionsDataGenerator, 4)
    .then(async () => prisma.$disconnect())
    .catch(async (error) => {
        console.log(error)
        prisma.$disconnect();
        process.exit(1);
    });
seeder.seedUsers(userDataGenerator, 45)
    .then(async () => prisma.$disconnect())
    .catch(async (error) => {
        console.log(error)
        prisma.$disconnect();
        process.exit(1);
    });
