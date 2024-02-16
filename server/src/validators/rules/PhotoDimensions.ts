import IValidationRule from './ValidationRuleInterface';
import {User} from '@prisma/client';
import {DataFieldType} from '../../types/user-types';
import sharp from 'sharp';

export default class PhotoDimensions implements IValidationRule {
    /**
     * @inheritDoc
     */
    async validate(data: User, field: DataFieldType, ruleParams: string[]): Promise<boolean> {
        const minDimensions = ruleParams[0];
        const [width, height] = minDimensions.split('x');
        const photo = data[field];
        const image = sharp((photo as unknown as Express.Multer.File).buffer);
        const result = await image.metadata().then(metadata => {
            return metadata.width && metadata.height && metadata.width > +width && metadata.height > +height;
        });

        return  !!result;
    }

    /**
     * @inheritDoc
     */
    getMessage(data: User, field: string): string {
        return "The image should be minimum 25x25";
    }
}