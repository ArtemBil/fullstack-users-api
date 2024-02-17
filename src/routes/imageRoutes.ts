import {Request, Response, Router} from 'express';
import {pipeline} from 'stream/promises';
import { v2 as cloudinaryApi } from 'cloudinary';

const router = Router();

router.get('/images/users/:id', async (req: Request, res: Response) => {
    const fileId = <string>req.params.id.split('.')[0];
    const folder = 'users';
    const cloudinaryUrl = cloudinaryApi.url(`${folder}/${fileId}`);
    const imageResponse = await fetch(cloudinaryUrl);

    if (!imageResponse.ok) {
        return res.status(404).end();
    }

    res.setHeader('Content-Type', imageResponse.headers.get('content-type') as string);

    if (imageResponse.body) {
        return await pipeline(imageResponse.body, res);
    }

    return res.status(404).end();
});

export default router;