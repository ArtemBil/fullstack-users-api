import axios from 'axios';
import {UsersDataObject} from '../types/user-types';

export default async function getUsersList(page = 1) {
    const {data: users} = await axios.get<UsersDataObject>(`/api/v1/users?page=${page}`);

    return users;
}