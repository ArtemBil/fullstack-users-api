import IValidationRule from '../validators/rules/ValidationRuleInterface';
import {DataFieldType} from './user-types';

export type ErrorType = {
    [field: string]: string[]
}

export type FieldRulesType = {
    [field in DataFieldType]: string[];
};

export type RuleType = {
    [rule: string]: IValidationRule;
}