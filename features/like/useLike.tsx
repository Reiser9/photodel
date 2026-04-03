import type { LikeEntites } from "@/entities/like";
import useRequest from "@/shared/hooks/useRequest";

const useLike = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const addLike = async (
        data: {
            entityType: LikeEntites;
            entityId: number;
        },
        successCallback = () => {},
    ) => {
        const response = await request({
            url: "/likes",
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

    const removeLike = async (
        id: number | string,
        successCallback = () => {},
    ) => {
        const response = await request({
            url: `/likes/${id}`,
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

    return {
        addLike,
        removeLike,
    };
};

export default useLike;
