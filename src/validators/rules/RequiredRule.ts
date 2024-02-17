import IValidationRule from './ValidationRuleInterface';
import {User} from '@prisma/client';
import {DataFieldType} from '../../types/user-types';

export default class RequiredRule implements IValidationRule {
    /**
     * @inheritDoc
     */
    validate(data: User, field: DataFieldType): boolean {
        return !!data[field];
    }

    /**
     * @inheritDoc
     */
    getMessage(data: User, field: string): string {
        return "The field is required";
    }
}