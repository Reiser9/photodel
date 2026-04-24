import useRequest from "@/shared/hooks/useRequest";
import type {
    Chat,
    ChatsPagination,
    Message,
    MessagesPagination,
} from "@/entities/messanger";
import { buildQueryString } from "@/shared/utils/buildQueryString";

const useMessanger = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const sendMessage = async (
        userId: number | string,
        content: string,
        messageTo: "user" | "chat" = "user",
        successCallback = () => {},
    ) => {
        const url =
            messageTo === "user"
                ? `/users/${userId}/messages`
                : `/chats/${userId}/messages`;

        const response = await request<{ message: Message }>({
            url,
            isAuth: true,
            method: "POST",
            data: { content },
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();

        if ("data" in response) {
            return response.data.message;
        }
    };

    const readMessage = async (
        messageId: number,
        successCallback = () => {},
    ) => {
        const response = await request<{ message: Message }>({
            url: `/messages/${messageId}/read`,
            isAuth: true,
            method: "PATCH",
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        successCallback();

        if ("data" in response) {
            return response.data.message;
        }
    };

    const getChatMessages = async (chatId: number | string) => {
        const response = await request<MessagesPagination>({
            url: `/chats/${chatId}/messages`,
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

    const getChats = async ({
        page = 1,
        limit = 10,
    }: {
        page?: number;
        limit?: number;
    }) => {
        const queryString = buildQueryString({ page, limit });

        const response = await request<ChatsPagination>({
            url: `/chats?${queryString}`,
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

    const getChatById = async (chatId: number | string) => {
        const response = await request<{ chat: Chat }>({
            url: `/chats/${chatId}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        if ("data" in response) {
            return response.data.chat;
        }
    };

    const getUnreadCount = async () => {
        const response = await request<{ count: number }>({
            url: "/chats/unread/count",
            isAuth: true,
        });

        if (catchRequestError(response)) {
            errorController(response);
            return "";
        }

        if ("data" in response) {
            return response.data.count;
        }
    };

    return {
        sendMessage,
        readMessage,
        getChatMessages,
        getChats,
        getChatById,
        getUnreadCount,
    };
};

export default useMessanger;
