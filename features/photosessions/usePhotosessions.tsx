"use client";

import type {
    PhotosessionById,
    PhotosessionDTO,
    PhotosessionsPagination,
} from "@/entities/photosessions";
import useAlert from "@/shared/hooks/useAlert";
import useRequest from "@/shared/hooks/useRequest";
import { buildQueryString } from "@/shared/utils/buildQueryString";

const usePhotosessions = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPhotosessions = async ({
        page = 1,
        limit = 12,
        sort,
        user_id,
        my,
    }: {
        page?: number;
        limit?: number;
        sort?: "newest" | "popularity" | "distance";
        user_id?: number | string;
        my?: boolean;
    }) => {
        const queryString = buildQueryString({
            page,
            limit,
            sort,
            user_id,
            my,
        });

        const response = await request<PhotosessionsPagination>({
            url: `/photo-sessions?${queryString}`,
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

    const createPhotosession = async (
        data: PhotosessionDTO,
        successCallback = () => {},
    ) => {
        const response = await request<{ photoSession: PhotosessionById }>({
            url: "/photo-sessions",
            isAuth: true,
            method: "POST",
            data,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();

        if ("data" in response) {
            return response.data.photoSession;
        }
    };

    const updatePhotosession = async (
        id: number | string,
        data: PhotosessionDTO,
        successCallback = () => {},
    ) => {
        const response = await request<{ photoSession: PhotosessionById }>({
            url: `/photo-sessions/${id}`,
            isAuth: true,
            method: "PATCH",
            data,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();
        alertNotify("Успешно", "Фотосессия обновлена");

        if ("data" in response) {
            return response.data.photoSession;
        }
    };

    const getPhotosessionById = async (
        id: number | string,
        successCallback = () => {},
    ) => {
        const response = await request<{ photoSession: PhotosessionById }>({
            url: `/photo-sessions/${id}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();

        if ("data" in response) {
            return response.data.photoSession;
        }
    };

    const deletePhotosession = async (
        id: number | string,
        successCallback = () => {},
    ) => {
        const response = await request<{ photoSession: PhotosessionById }>({
            url: `/photo-sessions/${id}`,
            isAuth: true,
            method: "DELETE",
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();
        alertNotify("Успешно", "Фотосессия удалена");

        if ("data" in response) {
            return response.data.photoSession;
        }
    };

    const deleteBulkPhotosessions = async (
        data: { ids: number[] },
        successCallback = () => {},
    ) => {
        const response = await request({
            url: "/photo-sessions/bulk-delete",
            isAuth: true,
            method: "POST",
            data,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();
        alertNotify("Успешно", "Фотосессии удалены");

        if ("data" in response) {
            return response.data;
        }
    };

    return {
        getPhotosessions,
        createPhotosession,
        updatePhotosession,
        getPhotosessionById,
        deletePhotosession,
        deleteBulkPhotosessions,
    };
};

export default usePhotosessions;
