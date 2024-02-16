import {User} from '@prisma/client';
import {DataFieldType} from '../../types/user-types';

export default interface IValidationRule {
    /**
     * Validate the field
     *
     * @param data
     * @param field
     * @param ruleParams
     */
    validate(data: User, field: DataFieldType, ruleParams?: string[]): Promise<boolean> | boolean;

    /**
     * Get error message if failed
     *
     * @param data
     * @param field
     * @param ruleParams
     */
    getMessage(data: User, field: string, ruleParams?: string[]): string;
}