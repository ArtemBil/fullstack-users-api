import {Request, Response, Router} from 'express';
import requireToken from '../../middleware/requireToken';
import ImageProcessor from '../../utils/image-processor';
import prisma from '../../services/prisma';
import requireUserIdParam from '../../middleware/requireUserId';
import {ValidatorService} from '../../validators/validator-service';
import {randomUUID} from 'crypto';
import {getNextLinkQuery, getPrevLinkQuery, getUrlWithoutMetadata} from '../../utils/utils';
import {UsersCreateQuery} from '../../types/user-types';


/** TODO: Not sure where it should be stored */
declare module 'http' {
    interface IncomingHttpHeaders {
        'token': string
    }
}

const router = Router();

router.get('/users/:id', requireUserIdParam, async (req: Request, res: Response) => {
    const singleUser = await prisma.user.findUnique({where: {id: +req.params.id}});

    if (!singleUser) {
        return res.send({
            success: false,
            message: 'User not found'
        })
    }

    return res.send({success: true, user: singleUser});
});

router.get('/positions', async (req: Request, res: Response) => {
    const positions = await prisma.position.findMany();

    return res.send({
        success: true,
        positions
    });
});

router.get('/users', async (req: Request<{}, {}, {}, UsersCreateQuery>, res: Response) => {
    const currentPage = +req.query.page;

    if (currentPage < 1) {
        return res.send({
            success: false,
            message: 'Validation failed',
            errors: {
                page: ['The page must be at least 1.']
            }
        })
    }

    const offset = req.query.offset;
    const limit = +req.query.count || 6;
    const step = ((currentPage || 1) * limit) - limit;

    try {
        const usersCount = await prisma.user.count();
        const total_pages = Math.ceil(usersCount / limit);
        const users = await prisma.user.findMany({
            skip: offset ? +offset : step,
            take: limit
        });

        if (offset && offset > usersCount || currentPage > total_pages) {
            return res.send({success: false, message: 'Not found'});
        }

        const linksUrl = getUrlWithoutMetadata(req);

        return res.send({
            success: true,
            total_pages: total_pages,
            total_users: usersCount,
            count: limit,
            ...(offset && currentPage ? {offset: +offset} : {page: currentPage || 1}),
            links: {
                next_url: total_pages === currentPage ? null : getNextLinkQuery(linksUrl, {page: currentPage, offset, count: limit}),
                prev_url: getPrevLinkQuery(linksUrl, {page: currentPage, offset, count: limit}),
            },
            users
        });
    } catch (e) {
        res.send({success: false, message: (e as Error).message});
    }
});

router.post('/users', requireToken, async (req: Request, res: Response) => {
    const validatorService = new ValidatorService();
    const {isValid, errors} = await validatorService.validateUser({...req.body, photo: req.file});

    if (isValid) {
        const userExists = await prisma.user.findFirst({
            where: {
                OR: [{email: req.body.email as string}, {phone: req.body.phone as string}]
            }
        })

        if (userExists) {
            return res.status(400).send({
                success: false,
                message: 'User with such email or phone exists'
            })
        }

        const positions = await prisma.position.findUnique({where: {id: +req.body.position_id}});
        const imageProcessor = new ImageProcessor(req.file as Express.Multer.File);
        const resizedImage = await imageProcessor.resize(70, 70);
        const optimizedImage = await imageProcessor.optimizeByBuffer(resizedImage);

        try {
            const uploadResult = await imageProcessor.uploadToCloudinaryStream(optimizedImage, {
                folder: 'users'
            });

            const placeholder = 'https://res.cloudinary.com/demo/image/upload/d_avatar.png/non_existing_id.png';
            const photoUrl = uploadResult ? `${process.env.BASE_URL}/images/${uploadResult.public_id}.jpeg` : placeholder;

            await prisma.user.create({
                data: {
                    name: req.body.name,
                    phone: req.body.phone,
                    photo: photoUrl,
                    position: (positions as {id: number, name: string}).name as string,
                    position_id: +req.body.position_id,
                    email: req.body.email
                }
            });

            return res.send({
                success: true,
                message: 'User has successfully been created'
            });

        } catch (e) {
            return res.status(400).send({success: false, message: 'Error while saving the user.'});
        }
    } else {
        return res.status(400).json({success: false, errors});
    }
});

export default router;
