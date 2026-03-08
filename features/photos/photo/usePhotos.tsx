"use client";

import type {
    Photo,
    PhotoDTO,
    PhotosPagination,
} from "@/entities/photos/photo";
import useRequest from "@/shared/hooks/useRequest";
import { buildQueryString } from "@/shared/utils/buildQueryString";

const usePhotos = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getMyPhotos = async (page = 1, limit = 12) => {
        const queryString = buildQueryString({
            page,
            limit,
        });

        const response = await request<PhotosPagination>({
            url: `/photos/my?${queryString}`,
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

        if ("data" in response) {
            return response.data.photo;
        }
    };

    return {
        getMyPhotos,
        createPhoto,
        updatePhoto,
        getPhotoById,
        deletePhoto,
    };
};

export default usePhotos;
