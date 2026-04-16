"use client";

import type {
    LocationCountriesPagination,
    Place,
    PlaceById,
    PlaceDTO,
    PlaceRequest,
    PlaceRequestDTO,
    PlacesPagination,
} from "@/entities/places";
import useAlert from "@/shared/hooks/useAlert";
import useRequest from "@/shared/hooks/useRequest";
import { buildQueryString } from "@/shared/utils/buildQueryString";

const usePlaces = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPlaces = async ({
        page = 1,
        limit = 12,
        sort = "newest",
        user_id,
        my,
        search,
        category,
    }: {
        page?: number;
        limit?: number;
        sort?: "newest" | "popularity" | "distance";
        user_id?: string | number;
        my?: boolean;
        search?: string;
        category?: string | number;
    }) => {
        const queryString = buildQueryString({
            page,
            limit,
            sort,
            user_id,
            my,
            search,
            specialization_id: category,
        });

        const response = await request<PlacesPagination>({
            url: `/filming-locations?${queryString}`,
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

    const createPlace = async (data: PlaceDTO, successCallback = () => {}) => {
        const response = await request<{ filmingLocation: Place }>({
            url: "/filming-locations",
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
            return response.data.filmingLocation;
        }
    };

    const updatePlace = async (
        id: number | string,
        data: PlaceDTO,
        successCallback = () => {},
    ) => {
        const response = await request<{ filmingLocation: Place }>({
            url: `/filming-locations/${id}`,
            isAuth: true,
            method: "PATCH",
            data,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();
        alertNotify("Успешно", "Место для съемок обновлено");

        if ("data" in response) {
            return response.data.filmingLocation;
        }
    };

    const getPlaceById = async (
        id: number | string,
        successCallback = () => {},
    ) => {
        const response = await request<{ filmingLocation: PlaceById }>({
            url: `/filming-locations/${id}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();

        if ("data" in response) {
            return response.data.filmingLocation;
        }
    };

    const deletePlace = async (
        id: number | string,
        successCallback = () => {},
    ) => {
        const response = await request<{ filmingLocation: Place }>({
            url: `/filming-locations/${id}`,
            isAuth: true,
            method: "DELETE",
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();
        alertNotify("Успешно", "Место для съемок удалено");

        if ("data" in response) {
            return response.data.filmingLocation;
        }
    };

    const deleteBulkPlaces = async (
        data: { ids: number[] },
        successCallback = () => {},
    ) => {
        const response = await request({
            url: "/filming-locations/bulk-delete",
            isAuth: true,
            method: "POST",
            data,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();
        alertNotify("Успешно", "Места для съемок удалены");

        if ("data" in response) {
            return response.data;
        }
    };

    const getLocationPlaces = async ({
        page = 1,
        limit = 12,
        search,
    }: {
        page?: number;
        limit?: number;
        search?: string;
    }) => {
        const queryString = buildQueryString({
            page,
            limit,
            search,
        });

        const response = await request<LocationCountriesPagination>({
            url: `/locations/places?${queryString}`,
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

    const createPlacesRequest = async (
        data: PlaceRequestDTO,
        successCallback = () => {},
    ) => {
        const response = await request({
            url: "/filming-requests",
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

    const getPlacesRequest = async () => {
        const response = await request<{filmingRequests: PlaceRequest[]}>({
            url: "/filming-requests",
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        if ("data" in response) {
            return response.data.filmingRequests;
        }
    };

    const acceptRequestPlace = async (
        id: number,
        successCallback = () => {},
    ) => {
        const response = await request({
            url: `/filming-requests/${id}/accept`,
            isAuth: true,
            method: "PATCH",
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();
        alertNotify("Успешно", "Запрос на съемку принят");

        if ("data" in response) {
            return response.data;
        }
    };

    const rejectRequestPlace = async (
        id: number,
        successCallback = () => {},
    ) => {
        const response = await request({
            url: `/filming-requests/${id}/reject`,
            isAuth: true,
            method: "PATCH",
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();
        alertNotify("Успешно", "Запрос на съемку отклонён");

        if ("data" in response) {
            return response.data;
        }
    };

    const removePlaceRequest = async (requestId: number, successCallback = () => {}) => {
        const response = await request({
            url: `/filming-requests/${requestId}`,
            isAuth: true,
            method: "DELETE",
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();
        alertNotify("Успешно", "Запрос на съемку удалён");

        if ("data" in response) {
            return response.data;
        }
    };

    return {
        getPlaces,
        createPlace,
        updatePlace,
        getPlaceById,
        deletePlace,
        deleteBulkPlaces,
        getLocationPlaces,
        createPlacesRequest,
        getPlacesRequest,
        acceptRequestPlace,
        rejectRequestPlace,
        removePlaceRequest
    };
};

export default usePlaces;
