'use client';

import axios, { AxiosInstance, AxiosResponse, isAxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    timeout: 15000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

const publicEndpoints = [
    '/health',
    '/auth/login',
    '/auth/register',
    '/auth/recovery-password',
    '/auth/pro-categories',
    '/auth/specializations'
];

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

type RefreshResponse = AxiosResponse<{
    accessToken: string;
}>;

let refreshPromise: Promise<RefreshResponse> | null = null;

const refreshAccessToken = async (): Promise<RefreshResponse> => {
    return await axios.get<{ accessToken: string }>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
        {
            withCredentials: true
        }
    );
};

axiosInstance.interceptors.request.use(
    async req => {
        const accessToken = localStorage.getItem('accessToken');

        if (publicEndpoints.includes(req.url || '')) {
            return req;
        }

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
                if (!refreshPromise) {
                    refreshPromise = refreshAccessToken().finally(() => {
                        refreshPromise = null;
                    });
                }

                const response = await refreshPromise;

                if (response.status === 200) {
                    localStorage.setItem(
                        'accessToken',
                        response.data.accessToken
                    );
                    req.headers.Authorization = `Bearer ${response.data.accessToken}`;

                    return req;
                }
            } catch (error) {
                console.error('2', error);
                localStorage.removeItem('accessToken');
            }
        }

        return req;
    },
    error => {
        console.log('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
