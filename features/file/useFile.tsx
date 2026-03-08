"use client";

import { File } from "@/entities/file";
import useRequest from "@/shared/hooks/useRequest";

const useFile = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const uploadFile = async (file: FormData) => {
        const response = await request<{ files: File[] }>({
            url: "/files/upload",
            data: file,
            method: "POST",
            isAuth: true,
            headers: {
                "Content-type": "multipart/form-data",
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ("data" in response) {
            return response.data.files;
        }
    };

    return {
        uploadFile,
    };
};

export default useFile;
