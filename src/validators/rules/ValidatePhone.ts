import IValidationRule from './ValidationRuleInterface';
import {User} from '@prisma/client';
import {DataFieldType} from '../../types/user-types';

export default class ValidatePhone implements IValidationRule {
    /**
     * Regexp for UA phone number pattern
     */
    UA_PHONE_PATTERN_REGEXP = /^\+?3?8?(0\d{9})$/;

    /**
     * @inheritDoc
     */
    validate(data: User, field: DataFieldType): boolean {
        return this.UA_PHONE_PATTERN_REGEXP.test(<string>data[field]);
    }

    /**
     * @inheritDoc
     */
    getMessage(data: User, field: string): string {
        return "Please enter UA phone number format";
    }
}