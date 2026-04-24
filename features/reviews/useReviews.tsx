"use client";

import type { FavoriteEntites } from "@/entities/favorite";
import { Review, ReviewDTO, ReviewsPagination } from "@/entities/review";
import useAlert from "@/shared/hooks/useAlert";
import useRequest from "@/shared/hooks/useRequest";
import { buildQueryString } from "@/shared/utils/buildQueryString";

const useReviews = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getReviews = async ({
        page = 1,
        limit = 12,
        type,
        entity_id,
        my = false,
    }: {
        page?: number;
        limit?: number;
        type: FavoriteEntites;
        entity_id?: number;
        my?: boolean;
    }) => {
        const queryString = buildQueryString({
            page,
            limit,
            type,
            entity_id,
            my,
        });

        const response = await request<ReviewsPagination>({
            url: `/reviews?${queryString}`,
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

    const createReview = async (
        data: ReviewDTO,
        successCallback = () => {},
    ) => {
        const response = await request<{ review: Review }>({
            url: "/reviews",
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
            return response.data.review;
        }
    };

    const updateReview = async (
        id: number | string,
        data: ReviewDTO,
        successCallback = () => {},
    ) => {
        const response = await request<{ review: Review }>({
            url: `/reviews/${id}`,
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
            return response.data.review;
        }
    };

    const getReviewById = async (
        id: number | string,
        successCallback = () => {},
    ) => {
        const response = await request<{ review: Review }>({
            url: `/reviews/${id}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();

        if ("data" in response) {
            return response.data.review;
        }
    };

    const deleteReview = async (
        id: number | string,
        successCallback = () => {},
    ) => {
        const response = await request<{ review: Review }>({
            url: `/reviews/${id}`,
            isAuth: true,
            method: "DELETE",
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();
        alertNotify("Успешно", "Отзыв удален");

        if ("data" in response) {
            return response.data.review;
        }
    };

    return {
        getReviews,
        createReview,
        updateReview,
        getReviewById,
        deleteReview,
    };
};

export default useReviews;
