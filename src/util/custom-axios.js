import axios from 'axios';

const customAxios = axios.create({
    baseURL: '/api',
    timeout: 1000 * 60 * 5, // 5分钟
    validateStatus: () => true,
});

export default customAxios;
