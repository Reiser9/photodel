"use client";

import type { Place, PlaceById, PlaceDTO, PlacesPagination } from "@/entities/places";
import useAlert from "@/shared/hooks/useAlert";
import useRequest from "@/shared/hooks/useRequest";
import { buildQueryString } from "@/shared/utils/buildQueryString";

const usePlaces = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getMyPlaces = async ({
        page = 1,
        limit = 12,
    }: {
        page?: number;
        limit?: number;
    }) => {
        const queryString = buildQueryString({
            page,
            limit,
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

    return {
        getMyPlaces,
        createPlace,
        updatePlace,
        getPlaceById,
        deletePlace,
        deleteBulkPlaces,
    };
};

export default usePlaces;
