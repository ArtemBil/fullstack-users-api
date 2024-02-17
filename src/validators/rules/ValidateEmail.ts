import IValidationRule from './ValidationRuleInterface';
import {User} from '@prisma/client';
import {DataFieldType} from '../../types/user-types';

export default class ValidateEmail implements IValidationRule {
    /**
     * RPC2822 Standard regex pattern for email validation
     */
    RPC2822_EMAIL_CHECK_PATTERN = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    /**
     * @inheritDoc
     */
    validate(data: User, field: DataFieldType): boolean {
        return this.RPC2822_EMAIL_CHECK_PATTERN.test(<string>data[field]);
    }

    /**
     * @inheritDoc
     */
    getMessage(data: User, field: string): string {
        return "The email is incorrect";
    }
}