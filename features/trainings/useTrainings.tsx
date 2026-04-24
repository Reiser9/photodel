"use client";

import type {
    Training,
    TrainingById,
    TrainingDTO,
    TrainingsPagination,
} from "@/entities/trainings";
import useRequest from "@/shared/hooks/useRequest";
import { buildQueryString } from "@/shared/utils/buildQueryString";

const useTrainings = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getTrainings = async ({
        page,
        limit,
        sort,
        user_id,
        my,
        search,
        specialization_id,
    }: {
        page?: number;
        limit?: number;
        sort?: "newest" | "popularity" | "distance";
        user_id?: number | string;
        my?: boolean;
        search?: string;
        specialization_id?: number;
    }) => {
        const queryString = buildQueryString({
            page,
            limit,
            sort,
            user_id,
            my,
            search,
            specialization_id,
        });

        const response = await request<TrainingsPagination>({
            url: `/trainings?${queryString}`,
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

    const createTraining = async (
        data: TrainingDTO,
        successCallback = () => {},
    ) => {
        const response = await request<{ training: Training }>({
            url: "/trainings",
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
            return response.data.training;
        }
    };

    const getTrainingById = async (
        id: number | string,
        successCallback = () => {},
    ) => {
        const response = await request<{ training: TrainingById }>({
            url: `/trainings/${id}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();

        if ("data" in response) {
            return response.data.training;
        }
    };

    const updateTraining = async (
        id: number | string,
        data: TrainingDTO,
        successCallback = () => {},
    ) => {
        const response = await request<{ trainings: Training }>({
            url: `/trainings/${id}`,
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
            return response.data.trainings;
        }
    };

    const deleteTraining = async (
        id: number | string,
        successCallback = () => {},
    ) => {
        const response = await request<{ training: Training }>({
            url: `/trainings/${id}`,
            isAuth: true,
            method: "DELETE",
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();

        if ("data" in response) {
            return response.data.training;
        }
    };

    const deleteBulkTrainings = async (
        data: { ids: number[] },
        successCallback = () => {},
    ) => {
        const response = await request({
            url: "/trainings/bulk-delete",
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
        getTrainings,
        createTraining,
        getTrainingById,
        updateTraining,
        deleteTraining,
        deleteBulkTrainings,
    };
};

export default useTrainings;
