import axios from 'axios';

export default async function getToken() {
    const {data} = await axios.get<{success: boolean, token?: string}>('/api/v1/token');

    return data;
}