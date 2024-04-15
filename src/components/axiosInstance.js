import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/',
});

axiosInstance.interceptors.request.use(
    config => {
        const jwt = localStorage.getItem('auth_token');
        if (jwt) {
            config.headers.Authorization = `Bearer ${jwt}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
