import {Request} from 'express';
export interface User {
    id: number;
    name: string;
    phone: string;
    photo: Express.Multer.File;
    email: number;
    position: string;
    position_id: number;
    creation_timestamp: number;
}

export type DataFieldType = 'name' | 'photo' | 'position_id' | 'phone' | 'email';

export interface UserResponse {
    success: boolean;
    message?: string;
}

export interface UsersCreateQuery {
    page?: string;
    offset?: string;
    count?: string;
}

export interface UsersNavigationLinks {
    page: number;
    offset?: number;
    count: number;
}

export type RequestWithQuery = Request<{}, {}, {}, UsersCreateQuery>;

export type QueryFieldTypes = 'page' | 'offset' | 'count';