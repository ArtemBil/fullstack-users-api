import IValidationRule from './ValidationRuleInterface';
import {User} from '@prisma/client';
import {DataFieldType} from '../../types/user-types';
import sharp from 'sharp';

export default class PhotoExtension implements IValidationRule {
    /**
     * @inheritDoc
     */
    async validate(data: User, field: DataFieldType, ruleParams: string[]): Promise<boolean> {
        const expectedMimeType = ruleParams[0];
        return (data[field] as unknown as Express.Multer.File).mimetype === expectedMimeType;
    }

    /**
     * @inheritDoc
     *
     */
    getMessage(data: User, field: string): string {
        return 'The file should be only in jpg/jpeg format';
    }
}