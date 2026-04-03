"use client";

import type {
    Album,
    AlbumDTO,
    AlbumsPagination,
    CreateAlbumDTO,
} from "@/entities/photos/album";
import useAlert from "@/shared/hooks/useAlert";
import useRequest from "@/shared/hooks/useRequest";
import { buildQueryString } from "@/shared/utils/buildQueryString";

const useAlbums = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getMyAlbums = async (page = 1, limit = 12) => {
        const queryString = buildQueryString({
            page,
            limit,
        });

        const response = await request<AlbumsPagination>({
            url: `/albums?${queryString}`,
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

    const createAlbum = async (
        data: CreateAlbumDTO,
        successCallback = () => {},
    ) => {
        const response = await request<{ album: Album }>({
            url: "/albums",
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
            return response.data.album;
        }
    };

    const updateAlbum = async (
        id: number | string,
        data: AlbumDTO,
        successCallback = () => {},
    ) => {
        const response = await request<{ album: Album }>({
            url: `/albums/${id}`,
            isAuth: true,
            method: "PATCH",
            data,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();
        alertNotify("Успешно", "Альбом обновлен");

        if ("data" in response) {
            return response.data.album;
        }
    };

    const getAlbumById = async (
        id: number | string,
        successCallback = () => {},
    ) => {
        const response = await request<{ album: Album }>({
            url: `/albums/${id}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();

        if ("data" in response) {
            return response.data.album;
        }
    };

    const deleteAlbum = async (
        id: number | string,
        successCallback = () => {},
    ) => {
        const response = await request<{ album: Album }>({
            url: `/albums/${id}`,
            isAuth: true,
            method: "DELETE",
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();
        alertNotify("Успешно", "Альбом удален");

        if ("data" in response) {
            return response.data.album;
        }
    };

    const deleteBuldAlbums = async (
        data: { ids: number[] },
        successCallback = () => {},
    ) => {
        const response = await request({
            url: "/albums/bulk-delete",
            isAuth: true,
            method: "POST",
            data,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();
        alertNotify("Успешно", "Альбомы удалены");

        if ("data" in response) {
            return response.data;
        }
    };

    const addPhotosToAlbum = async (
        albumId: number | string,
        data: { ids: number[] },
        successCallback = () => {},
    ) => {
        const response = await request({
            url: `/albums/${albumId}/photos`,
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
            return response.data;
        }
    };

    const deletePhotosInAlbum = async (
        albumId: number | string,
        data: { ids: number[] },
        successCallback = () => {},
    ) => {
        const response = await request({
            url: `/albums/${albumId}/photos/bulk-delete`,
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
            return response.data;
        }
    };

    return {
        getMyAlbums,
        createAlbum,
        updateAlbum,
        getAlbumById,
        deleteAlbum,
        deleteBuldAlbums,
        addPhotosToAlbum,
        deletePhotosInAlbum,
    };
};

export default useAlbums;
