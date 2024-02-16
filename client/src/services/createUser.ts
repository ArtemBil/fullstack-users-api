import apiInstance from './axios-instance';
import {UserCreateData, UserCreateResponse} from '../types/user-types';

export default async function createUser(userData: UserCreateData) {
    const formData = new FormData();

    for (const [field, value] of Object.entries(userData)) {
        if (field === 'photo' && value instanceof File) {
            formData.append(field, value, value.name);
        } else {
            formData.append(field, value);
        }
    }

    console.log('TEST')
    const { data } = await apiInstance.post<UserCreateResponse>('/api/users', userData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
    return data;
}