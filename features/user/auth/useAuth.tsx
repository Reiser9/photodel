"use client";

import React from "react";

import type {
    RegisterData,
    RegisterResponse,
    LoginData,
    LoginResponse,
    VerifyCode,
    RecoveryData,
    RecoveryVerifyData,
    RecoveryChangeData,
} from "@/entities/user";
import useRequest from "@/shared/hooks/useRequest";
import useAlert from "@/shared/hooks/useAlert";
import { useAppDispatch } from "@/shared/hooks/useRedux";
import { setIsAuth, setIsVerified } from "@/store/slices/user";

const useAuth = () => {
    const [authIsLoading, setAuthIsLoading] = React.useState(false);

    const { request, catchRequestError, errorController } = useRequest();
    const dispatch = useAppDispatch();
    const { alertNotify } = useAlert();

    const register = async (data: RegisterData, successCallback = () => {}) => {
        setAuthIsLoading(true);
        const response = await request<RegisterResponse>({
            url: "/auth/register",
            method: "POST",
            data,
        }).finally(() => {
            setAuthIsLoading(false);
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ("data" in response) {
            dispatch(setIsAuth(true));
            dispatch(setIsVerified(response.data.user.isVerified));
            localStorage.setItem("accessToken", response.data.accessToken);
        }

        alertNotify("Успешно", "Введите код из письма");
        successCallback();
    };

    const login = async (data: LoginData, successCallback = () => {}) => {
        setAuthIsLoading(true);
        const response = await request<LoginResponse>({
            url: "/auth/login",
            method: "POST",
            data,
        }).finally(() => {
            setAuthIsLoading(false);
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ("data" in response) {
            dispatch(setIsAuth(true));
            dispatch(setIsVerified(response.data.user.isVerified));
            localStorage.setItem("accessToken", response.data.accessToken);
        }

        alertNotify("Успешно", "Вы авторизовались");
        successCallback();
    };

    const verifyEmail = async (
        data: VerifyCode,
        successCallback = () => {},
    ) => {
        setAuthIsLoading(true);
        const response = await request({
            url: "/auth/verify-email",
            method: "POST",
            isAuth: true,
            data,
        }).finally(() => {
            setAuthIsLoading(false);
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        dispatch(setIsVerified(true));

        alertNotify("Успешно", "Почта подтверждена");
        successCallback();
    };

    const sendVerifyCode = async (successCallback = () => {}) => {
        setAuthIsLoading(true);
        const response = await request({
            url: "/auth/resend-verification",
            isAuth: true,
        }).finally(() => {
            setAuthIsLoading(false);
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify("Успешно", "Код выслан повторно");
        successCallback();
    };

    const logout = async (successCallback = () => {}) => {
        setAuthIsLoading(true);
        const response = await request({
            url: "/auth/logout",
            isAuth: true,
        }).finally(() => {
            setAuthIsLoading(false);
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        dispatch(setIsAuth(false));
        dispatch(setIsVerified(false));
        localStorage.removeItem("accessToken");

        alertNotify("Успешно", "Вы вышли с аккаунта");
        successCallback();
    };

    const sendRecoveryCode = async (
        data: RecoveryData,
        successCallback = () => {},
    ) => {
        setAuthIsLoading(true);
        const response = await request({
            url: "/auth/send-recovery",
            method: "POST",
            data,
        }).finally(() => {
            setAuthIsLoading(false);
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify("Успешно", "Код верификации почты отправлен");
        successCallback();
    };

    const verifyRecoveryCode = async (
        data: RecoveryVerifyData,
        successCallback = () => {},
    ) => {
        setAuthIsLoading(true);
        const response = await request<{ code: string }>({
            url: "/auth/verify-recovery",
            method: "POST",
            data,
        }).finally(() => {
            setAuthIsLoading(false);
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify("Успешно", "Код подтверждения верный");
        successCallback();

        if("data" in response){
            return response.data.code;
        }
    };

    const changePasswordRecovery = async (
        data: RecoveryChangeData,
        successCallback = () => {},
    ) => {
        setAuthIsLoading(true);
        const response = await request({
            url: "/auth/recovery-password",
            method: "POST",
            data,
        }).finally(() => {
            setAuthIsLoading(false);
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify("Успешно", "Пароль изменен");
        successCallback();
    };

    return {
        authIsLoading,
        register,
        login,
        verifyEmail,
        sendVerifyCode,
        logout,
        sendRecoveryCode,
        verifyRecoveryCode,
        changePasswordRecovery,
    };
};

export default useAuth;
