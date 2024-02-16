import getToken from './getToken';
import axios from 'axios';

export const apiInstance = axios.create({});

getToken().then((result) => {
    if (result.token) {
        apiInstance.defaults.headers.common['Token'] = result.token;
    }
});

export default apiInstance;