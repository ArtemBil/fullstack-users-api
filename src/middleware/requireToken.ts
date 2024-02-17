import {Request, Response} from 'express';
import jwt, {TokenExpiredError} from 'jsonwebtoken';

export default async function requireToken(req: Request, res: Response, next: Function) {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).send({
            success: false,
            message: 'The token must be provided via headers.'
        });
    }

    try {
        jwt.verify(token, process.env.JSW_TOKEN_KEY as string);

        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(400).send({
                success: false,
                message: 'The Token has expired. Please generate new one.'
            })
        }

        return res.status(403).send({
            success: false,
            message: `Failed to verify the token. Reason: ${(error as Error).message}`
        });
    }
}