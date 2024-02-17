import IValidationRule from './ValidationRuleInterface';
import {User} from '@prisma/client';
import {DataFieldType} from '../../types/user-types';
import sharp from 'sharp';

export default class PhotoMaxSize implements IValidationRule {
    /**
     * @inheritDoc
     */
    async validate(data: User, field: DataFieldType, ruleParams: string[]): Promise<boolean> {
        const maxSize = ruleParams[0];
        const megabites = maxSize.replace(/\D/g, '');
        const megabitesInBites = +megabites * 1024 * 1024;
        const photo = data[field];
        const image = sharp((photo as unknown as Express.Multer.File).buffer);
        const result = await image.metadata().then(metadata => {
            return metadata.size && metadata.size <= megabitesInBites;

        });

        return !!result;
    }


    /**
     * @inheritDoc
     *
     */
    getMessage(data: User, field: string): string {
        return 'The file should be maximum 5M';
    }
}