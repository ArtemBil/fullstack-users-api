import {Request, Response} from 'express';

export default async function requireUserIdParam(req: Request, res: Response, next: Function) {
    if (!req.params.id || isNaN(Number(req.params.id))) {
        return res.send({
            success: false,
            message: "The user with the requested id does not exist",
            errors: {
                "userId": ['The user id must be an integer']
            }
        })
    }

    next();
}