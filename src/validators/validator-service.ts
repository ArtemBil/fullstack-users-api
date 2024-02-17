import Validator from './validator';
import RequiredRule from './rules/RequiredRule';
import {User} from '@prisma/client';
import ValidatePhone from './rules/ValidatePhone';
import ValidateEmail from './rules/ValidateEmail';
import ValidatePositions from './rules/ValidatePositions';
import PhotoDimensions from './rules/PhotoDimensions';
import PhotoMaxSize from './rules/PhotoMaxSize';
import PhotoExtension from './rules/PhotoExtension';

export class ValidatorService {
    private validator: Validator;

    /**
     * Constructor
     */
    constructor() {
        this.validator = new Validator();
        this.validator.addRule('required', new RequiredRule());
        this.validator.addRule('phone', new ValidatePhone());
        this.validator.addRule('email', new ValidateEmail());
        this.validator.addRule('position_id', new ValidatePositions());
        this.validator.addRule('dimensions', new PhotoDimensions());
        this.validator.addRule('size', new PhotoMaxSize());
        this.validator.addRule('extension', new PhotoExtension());
    }

    /**
     * Validate user by rules
     *
     * @param data
     */
    public async validateUser(data: User) {
       return await this.validator.validate(data, {
            name: ['required'],
            photo: ['required', 'extension:image/jpeg', 'dimensions:70x70', 'size:5M'],
            email: ['required', 'email'],
            position_id: ['required', 'position_id'],
            phone: ['required', 'phone'],
        });
    }
}