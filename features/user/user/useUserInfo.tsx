"use client";

import type { AlbumsPagination } from "@/entities/photos/album";
import type { PhotosPagination } from "@/entities/photos/photo";
import type { PlacesPagination } from "@/entities/places";
import type {
    Category,
    ProfileInfo,
    ProfileInfoDTO,
    Social,
    UserInfo,
    UsersPagination,
} from "@/entities/user";
import useAlert from "@/shared/hooks/useAlert";
import { useAppDispatch } from "@/shared/hooks/useRedux";
import useRequest from "@/shared/hooks/useRequest";
import { buildQueryString } from "@/shared/utils/buildQueryString";
import { setAuthIsLoading } from "@/store/slices/app";
import { setIsAuth, setIsVerified } from "@/store/slices/user";

const useUserInfo = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();
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

    const getUserProfileById = async (userId: number | string) => {
        const response = await request<ProfileInfo>({
            url: `/users/${userId}/profile`,
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

    const getCategories = async () => {
        const response = await request<{ proCategories: Category[] }>({
            url: "/pro-categories",
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        if ("data" in response) {
            return response.data.proCategories;
        }
    };

    const getSpecializations = async (category_ids: number[] = []) => {
        const response = await request<{ specializations: Category[] }>({
            url: `/specializations?category_ids=${category_ids}`,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        if ("data" in response) {
            return response.data.specializations;
        }
    };

    const getSocials = async () => {
        const response = await request<{ socials: Social[] }>({
            url: "/socials",
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        if ("data" in response) {
            return response.data.socials;
        }
    };

    const updateProfile = async (
        data: ProfileInfoDTO,
        successCallback = () => {},
    ) => {
        const response = await request<ProfileInfo>({
            url: "/users/profile",
            method: "PATCH",
            isAuth: true,
            data,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();

        if ("data" in response) {
            return response.data.profile;
        }
    };

    const updateUserAvatar = async (
        avatar: string,
        successCallback = () => {},
    ) => {
        const response = await request<UserInfo>({
            url: "/users/avatar",
            isAuth: true,
            method: "PATCH",
            data: {
                avatar,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify("Успешно", "Аватар обновлен");

        if ("data" in response) {
            return response.data.user;
        }
    };

    const updateUserName = async (
        firstName: string,
        lastName: string,
        successCallback = () => {},
    ) => {
        const response = await request<UserInfo>({
            url: "/users/name",
            isAuth: true,
            method: "PATCH",
            data: {
                firstName,
                lastName,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify("Успешно", "Имя и фамилия обновлены");

        if ("data" in response) {
            return response.data.user;
        }
    };

    const getUsersPhotosById = async (
        id: number | string,
        page = 1,
        limit = 12,
        album_id?: number | string,
    ) => {
        const queryString = buildQueryString({
            page,
            limit,
            album_id,
        });

        const response = await request<PhotosPagination>({
            url: `/users/${id}/photos?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        if ("data" in response) {
            return response.data;
        }
    };

    const getUsersAlbumsById = async (
        id: number | string,
        page = 1,
        limit = 12,
    ) => {
        const queryString = buildQueryString({
            page,
            limit,
        });

        const response = await request<AlbumsPagination>({
            url: `/users/${id}/albums?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        if ("data" in response) {
            return response.data;
        }
    };

    const getUsersPlacesById = async (
        id: number | string,
        page = 1,
        limit = 12,
    ) => {
        const queryString = buildQueryString({
            page,
            limit,
        });

        const response = await request<PlacesPagination>({
            url: `/users/${id}/filming-locations?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        if ("data" in response) {
            return response.data;
        }
    };

    const getUsers = async ({
        page = 1,
        limit = 12,
        latitude,
        longitude,
        order = "popularity",
        place_id,
        pro_category_id,
        radius,
        search = "",
        specialization_id,
    }: {
        page?: number;
        limit?: number;
        latitude?: number;
        longitude?: number;
        order?: "popularity" | "distance";
        radius?: number;
        place_id?: number;
        search?: string;
        pro_category_id?: number;
        specialization_id?: number;
    }) => {
        const queryString = buildQueryString({
            page,
            limit,
            latitude,
            longitude,
            order,
            radius,
            place_id,
            search,
            pro_category_id,
            specialization_id,
        });

        const response = await request<UsersPagination>({
            url: `/users?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        if ("data" in response) {
            return response.data;
        }
    };

    return {
        getShortInfo,
        getProfileInfo,
        getUserProfileById,
        getCategories,
        getSpecializations,
        getSocials,
        updateProfile,
        updateUserAvatar,
        updateUserName,
        getUsersPhotosById,
        getUsersAlbumsById,
        getUsersPlacesById,
        getUsers,
    };
};

export default useUserInfo;
