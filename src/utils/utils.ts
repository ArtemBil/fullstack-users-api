import {UsersCreateQuery, UsersNavigationLinks} from '../types/user-types';
import {Request} from 'express';

/**
 * Get url without query params and hashes
 * @param req
 */
export const getUrlWithoutMetadata =  (req: Request<{}, {}, {}, UsersCreateQuery>): string => {
    const url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
    return `${url.protocol}//${url.host}${url.pathname}`;
}


/**
 * Get next link url
 *
 * @param url
 * @param query
 */
export function getNextLinkQuery(url: string, query: UsersNavigationLinks): string {
    if (query.offset) {
        return `${url}?offset=${+query.offset + query.count}&count=${query.count}`;
    }

    return `${url}?page=${query.page + 1}&count=${query.count}`;
}

/**
 * Get previous link url
 *
 * @param url
 * @param query
 */
export function getPrevLinkQuery(url: string, query: UsersNavigationLinks) {
    if (query.offset && query.count && query.offset - query.count) {
        return null;
    }

    if (query.offset) {
        return `${url}?offset=${query.offset - query.count}&count=${query.count}`;
    }

    if (query.page <= 1) {
        return null;
    }

    return `${url}?page=${query.page - 1}&count=${query.count}`;
}

/**
 * Validate if param is integer
 *
 * @param param
 */
export const isInteger = (param: any) => {
    return Number(param) === param && param % 1 === 0;
}