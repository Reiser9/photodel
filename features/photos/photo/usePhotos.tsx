"use client";

import type {
    Photo,
    PhotoDTO,
    PhotosPagination,
} from "@/entities/photos/photo";
import useAlert from "@/shared/hooks/useAlert";
import useRequest from "@/shared/hooks/useRequest";
import { buildQueryString } from "@/shared/utils/buildQueryString";

const usePhotos = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getMyPhotos = async ({
        page = 1,
        limit = 12,
        album_id,
        excluded_album_id,
    }: {
        page?: number;
        limit?: number;
        album_id?: number | string;
        excluded_album_id?: number | string;
    }) => {
        const queryString = buildQueryString({
            page,
            limit,
            album_id,
            excluded_album_id,
        });

        const response = await request<PhotosPagination>({
            url: `/photos?${queryString}`,
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

    const createPhoto = async (data: PhotoDTO, successCallback = () => {}) => {
        const response = await request<{ photo: Photo }>({
            url: "/photos",
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
            return response.data.photo;
        }
    };

    const updatePhoto = async (
        id: number | string,
        data: PhotoDTO,
        successCallback = () => {},
    ) => {
        const response = await request<{ photo: Photo }>({
            url: `/photos/${id}`,
            isAuth: true,
            method: "PATCH",
            data,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();
        alertNotify("Успешно", "Фото обновлено");

        if ("data" in response) {
            return response.data.photo;
        }
    };

    const getPhotoById = async (
        id: number | string,
        successCallback = () => {},
    ) => {
        const response = await request<{ photo: Photo }>({
            url: `/photos/${id}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();

        if ("data" in response) {
            return response.data.photo;
        }
    };

    const deletePhoto = async (
        id: number | string,
        successCallback = () => {},
    ) => {
        const response = await request<{ photo: Photo }>({
            url: `/photos/${id}`,
            isAuth: true,
            method: "DELETE",
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();
        alertNotify("Успешно", "Фотография удалена");

        if ("data" in response) {
            return response.data.photo;
        }
    };

    const deleteBulkPhotos = async (
        data: { ids: number[] },
        successCallback = () => {},
    ) => {
        const response = await request({
            url: "/photos/bulk-delete",
            isAuth: true,
            method: "POST",
            data,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();
        alertNotify("Успешно", "Фото удалены");

        if ("data" in response) {
            return response.data;
        }
    };

    return {
        getMyPhotos,
        createPhoto,
        updatePhoto,
        getPhotoById,
        deletePhoto,
        deleteBulkPhotos,
    };
};

export default usePhotos;
