import useRequest from "@/shared/hooks/useRequest";
import { buildQueryString } from "@/shared/utils/buildQueryString";
import type { AdminUsersPagination } from "@/entities/user";

const useAdmin = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getAdminUsers = async ({
        page = 1,
        limit = 12,
        latitude,
        longitude,
        sort = "popularity",
        place_id,
        pro_category_id,
        radius,
        search = "",
        specialization_id,
        successCallback = () => {},
    }: {
        page?: number;
        limit?: number;
        latitude?: number;
        longitude?: number;
        sort?: "newest" | "popularity" | "distance";
        radius?: number;
        place_id?: number;
        search?: string;
        pro_category_id?: number;
        specialization_id?: number;
        successCallback?: () => void;
    }) => {
        const queryString = buildQueryString({
            page,
            limit,
            latitude,
            longitude,
            sort,
            radius,
            place_id,
            search,
            pro_category_id,
            specialization_id,
        });

        const response = await request<AdminUsersPagination>({
            url: `/admin/users?${queryString}`,
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

    const blockUser = async (
        userId: number | string,
        successCallback = () => {},
    ) => {
        const response = await request({
            url: `/admin/users/${userId}/block`,
            isAuth: true,
            method: "PATCH",
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

    const unblockUser = async (
        userId: number | string,
        successCallback = () => {},
    ) => {
        const response = await request({
            url: `/admin/users/${userId}/unblock`,
            isAuth: true,
            method: "PATCH",
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
        getAdminUsers,
        blockUser,
        unblockUser,
    };
};

export default useAdmin;
