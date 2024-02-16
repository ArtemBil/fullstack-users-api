import axios from 'axios';
import {User, UsersDataObject} from '../types/user-types';

export default async function getUsersList(page = 1) {
    const {data: users} = await axios.get<UsersDataObject>(`/api/users?page=${page}`);

    return users;
}