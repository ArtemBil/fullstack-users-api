export interface UsersDataObject {
    count: number;
    links: {
        [field: string]: string
    };
    page: number;
    success: boolean;
    total_pages: number;
    total_users: number;
    users: User[]
}
export interface User {
    id: number;
    email: string;
    name: string;
    phone: string;
    photo: string;
    position: string;
    position_id: number;
    registration_timestamp: number;
}

export interface PositionsDataObject {
    success: boolean;
    positions: Position[];
}

export interface Position {
    id: number;
    name: string;
}

export type UserCreateData = {
    email?: string;
    name?: string;
    phone?: string;
    photo?: Blob;
    position_id?: string;
}

export type UserCreateResponse = {
    success: boolean,
    message: string;
    errors?: {
        [field: string]: string[]
    }
}

export type UserValidationErrorFields = {
    photo?: string[],
    name?: string[],
    email?: string[],
    position_id?: string[],
    phone?: string[],
}

export type DataFieldType = 'name' | 'phone' | 'photo' | 'email' | 'position_id';