import IValidationRule from './rules/ValidationRuleInterface';
import {User} from '@prisma/client';
import {ErrorType, FieldRulesType, RuleType} from '../types/validation-types';
import {DataFieldType} from '../types/user-types';

export default class Validator {
    private rules: RuleType = {};

    /**
     * Add new rule
     *
     * @param ruleName
     * @param rule
     */
    public addRule(ruleName: string, rule: IValidationRule) {
        this.rules[ruleName] = rule;
    }

    /**
     * Validate fields by the rules
     *
     * @param data
     * @param fields
     */
    public async validate(data: User, fields: FieldRulesType): Promise<{isValid: boolean; errors: ErrorType}> {
        const errors: ErrorType = {};
        const fieldsArray = Object.entries(fields) as [DataFieldType, string[]][];

        for (const [field, rules] of fieldsArray) {
            for (const rule of rules) {
                let ruleAdditionalParams: string[] = [];
                let ruleName = rule;

                if (rule.includes(':')) {
                    const [rulePart, ruleParams] = rule.split(':');
                    ruleAdditionalParams = ruleParams.split(',');
                    ruleName = rulePart;
                }

                const ruleValidator = this.rules[ruleName];
                const isValid = await ruleValidator.validate(data, field, ruleAdditionalParams);

                if (isValid) {
                    continue;
                }

                Array.isArray(errors[field]) ? errors[field].push(ruleValidator.getMessage(data, field, ruleAdditionalParams)) : errors[field] = [ruleValidator.getMessage(data, field, ruleAdditionalParams)];
                break;
            }
        }

        return {isValid: Object.keys(errors).length === 0, errors};
    }
}