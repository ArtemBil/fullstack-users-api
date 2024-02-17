import jwt from 'jsonwebtoken';

/**
 * Generate web token
 *
 * @param payload
 */
export default function generateWebToken(payload: any = {}) {
    const halfAnHour = 1800;
    return jwt.sign(payload, process.env.JSW_TOKEN_KEY as string, {expiresIn: halfAnHour, algorithm: 'HS256'});
}