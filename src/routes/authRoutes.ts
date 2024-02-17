import {Request, Response, Router} from 'express';
import generateWebToken from '../utils/generateToken';

const router = Router();

router.get('/token', (req: Request, res: Response) => {
    res.send({
        success: true,
        token: generateWebToken(),
    })
});
export default router;