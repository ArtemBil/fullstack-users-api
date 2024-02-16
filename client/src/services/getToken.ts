import axios from 'axios';

export default async function getToken() {
    const {data} = await axios.get<{success: boolean, token?: string}>('/api/token');

    return data;
}