import type { FavoriteEntites } from "@/entities/favorite";
import type { PhotosPagination } from "@/entities/photos/photo";
import type { UsersPagination } from "@/entities/user";
import type { PlacesPagination } from "@/entities/places";
import { buildQueryString } from "@/shared/utils/buildQueryString";
import useRequest from "@/shared/hooks/useRequest";
import { PhotosessionsPagination } from "@/entities/photosessions";

const useFavorite = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getFavorites = async (
        type: FavoriteEntites,
        page = 1,
        limit = 12,
        successCallback = () => {},
    ) => {
        const queryString = buildQueryString({
            page,
            limit,
            type,
        });

        const response = await request<
            | PlacesPagination
            | PhotosPagination
            | UsersPagination
            | PhotosessionsPagination
        >({
            url: `/favorites?${queryString}`,
            isAuth: true,
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

    const addFavorite = async (
        data: {
            entityType: FavoriteEntites;
            entityId: number;
        },
        successCallback = () => {},
    ) => {
        const response = await request({
            url: "/favorites",
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

    const removeFavorite = async (
        id: number | string,
        successCallback = () => {},
    ) => {
        const response = await request({
            url: `/favorites/${id}`,
            isAuth: true,
            method: "DELETE",
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

    const deleteBulkFavorites = async (
        data: { ids: number[] },
        successCallback = () => {},
    ) => {
        const response = await request({
            url: "/favorites/bulk-delete",
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
        getFavorites,
        addFavorite,
        removeFavorite,
        deleteBulkFavorites,
    };
};

export default useFavorite;
