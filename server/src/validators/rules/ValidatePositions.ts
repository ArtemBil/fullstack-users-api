import IValidationRule from './ValidationRuleInterface';
import {User} from '@prisma/client';
import {DataFieldType} from '../../types/user-types';
import prisma from '../../services/prisma';

export default class ValidatePositions implements IValidationRule {
    public async fetchPositions() {
        return await prisma.position.findMany() || [];
    }

    /**
     * @inheritDoc
     */
    async validate(data: User, field: DataFieldType): Promise<boolean> {
        const positions = await this.fetchPositions();

        return positions.some(position => position.id === +data[field]);
    }

    /**
     * @inheritDoc
     */
    getMessage(data: User, field: DataFieldType): string {
        return `The position with id "${data[field]}" does not exist`;
    }
}