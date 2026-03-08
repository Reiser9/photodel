"use client";

import type {
    Album,
    AlbumDTO,
    AlbumsPagination,
} from "@/entities/photos/album";
import useRequest from "@/shared/hooks/useRequest";
import { buildQueryString } from "@/shared/utils/buildQueryString";

const useAlbums = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getMyAlbums = async (page = 1, limit = 12) => {
        const queryString = buildQueryString({
            page,
            limit,
        });

        const response = await request<AlbumsPagination>({
            url: `/albums/my?${queryString}`,
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

    const createAlbum = async (data: AlbumDTO, successCallback = () => {}) => {
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

        if ("data" in response) {
            return response.data.album;
        }
    };

    return {
        getMyAlbums,
        createAlbum,
        updateAlbum,
        getAlbumById,
        deleteAlbum,
    };
};

export default useAlbums;
