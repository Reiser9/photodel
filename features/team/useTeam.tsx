"use client";

import React from "react";

import useAlert from "@/shared/hooks/useAlert";
import useRequest from "@/shared/hooks/useRequest";
import { TeamItem } from "@/entities/team";
import { buildQueryString } from "@/shared/utils/buildQueryString";

const useTeam = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getTeam = async ({ accepted = false }: { accepted?: boolean }) => {
        const queryString = buildQueryString({
            accepted,
        });

        const response = await request<{ teamRequests: TeamItem[] }>({
            url: `/teams/requests?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        if ("data" in response) {
            return response.data.teamRequests;
        }
    };

    const requestTeam = async (userId: number, successCallback = () => {}) => {
        const response = await request({
            url: "/teams/requests",
            isAuth: true,
            method: "POST",
            data: { userId },
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();
        alertNotify("Успешно", "Запрос отправлен");

        if ("data" in response) {
            return response.data;
        }
    };

    const acceptRequestTeam = async (
        id: number,
        successCallback = () => {},
    ) => {
        const response = await request({
            url: `/teams/requests/${id}/accept`,
            isAuth: true,
            method: "PATCH",
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();
        alertNotify("Успешно", "Запрос в команду принят");

        if ("data" in response) {
            return response.data;
        }
    };

    const rejectRequestTeam = async (
        id: number,
        successCallback = () => {},
    ) => {
        const response = await request({
            url: `/teams/requests/${id}/reject`,
            isAuth: true,
            method: "PATCH",
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();
        alertNotify("Успешно", "Запрос в команду отклонён");

        if ("data" in response) {
            return response.data;
        }
    };

    const removeTeam = async (
        requestId: number,
        successCallback = () => {},
    ) => {
        const response = await request({
            url: `/teams/requests/${requestId}`,
            isAuth: true,
            method: "DELETE",
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();
        alertNotify("Успешно", "Пользователь удален из команды");

        if ("data" in response) {
            return response.data;
        }
    };

    return {
        getTeam,
        requestTeam,
        acceptRequestTeam,
        rejectRequestTeam,
        removeTeam,
    };
};

export default useTeam;
