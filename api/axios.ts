'use client';

import axios, { AxiosInstance, isAxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    timeout: 15000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const isAccessTokenValid = (accessToken: string | null) => {
    if (!accessToken) return false;

    try {
        const decodedToken: { exp?: number } = jwtDecode(accessToken);

        if (!decodedToken.exp) return false;

        const expirationTimestamp = decodedToken.exp * 1000;
        const currentTimestamp = Date.now();

        return expirationTimestamp - currentTimestamp > 10 * 1000;
    } catch (error) {
        console.error('Error decoded JWT:', error);
        return false;
    }
};

axiosInstance.interceptors.request.use(
    async (req) => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            return req;
        }

        try {
            const tokenIsValid = isAccessTokenValid(accessToken);

            if (!tokenIsValid) {
                throw new Error('Access token expired');
            }

            return req;
        } catch (error) {
            console.log(error);

            if (isAxiosError(error) && error.code === 'ERR_NETWORK') {
                return req;
            }

            try {
                const refresh = await axios.get<{ accessToken: string }>(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    },
                );

                if (refresh.status === 200) {
                    localStorage.setItem('accessToken', refresh.data.accessToken);
                    req.headers.Authorization = `Bearer ${refresh.data.accessToken}`;

                    return req;
                }
            } catch (error) {
                console.error('2', error);

                // localStorage.removeItem('accessToken');
            }
        }

        return req;
    },
    (error) => {
        console.log('Request interceptor error:', error);
        return Promise.reject(error);
    },
);

export default axiosInstance;
