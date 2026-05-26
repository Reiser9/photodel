"use client";

import type { Notify } from "@/entities/notify";
import useRequest from "@/shared/hooks/useRequest";

const useNotify = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getNotifies = async () => {
        const response = await request<Notify>({
            url: "/notifications/count",
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

    return {
        getNotifies,
    };
};

export default useNotify;
