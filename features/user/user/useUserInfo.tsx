"use client";

import type { ProfileInfo, UserInfo } from "@/entities/user";
import { useAppDispatch } from "@/shared/hooks/useRedux";
import useRequest from "@/shared/hooks/useRequest";
import { setAuthIsLoading } from "@/store/slices/app";
import { setIsAuth, setIsVerified } from "@/store/slices/user";

const useUserInfo = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const dispatch = useAppDispatch();

    const getShortInfo = async () => {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            dispatch(setAuthIsLoading(false));
            return "";
        }

        const response = await request<UserInfo>({
            url: "/users/me",
            isAuth: true,
        }).finally(() => dispatch(setAuthIsLoading(false)));

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        dispatch(setIsAuth(true));

        if ("data" in response) {
            dispatch(setIsVerified(response.data.user.isVerified));
            return response.data.user;
        }
    };

    const getProfileInfo = async () => {
        const response = await request<ProfileInfo>({
            url: "/users/profile",
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        if ("data" in response) {
            return response.data.profile;
        }
    };

    return {
        getShortInfo,
        getProfileInfo
    };
};

export default useUserInfo;
