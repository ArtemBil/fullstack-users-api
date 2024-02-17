export interface User {
    id: number;
    name: string;
    phone: string;
    photo: string;
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
    page: number;
    offset?: number;
    count: number;
}