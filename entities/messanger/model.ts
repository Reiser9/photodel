import type { Pagination } from "../pagination";
import type { UserInfoShort } from "../photos/photo";

export type Message = {
    id: number;
    content: string;
    sender: UserInfoShort;
    createdAt: string;
    updatedAt: string;
};

export type Chat = {
    id: number;
    title: string;
    picture: string;
    latestMessage: Message;
    unreadCount: number;
    userId: number;
};

export type ChatsPagination = Pagination & {
    data: Chat[];
};

export type MessagesPagination = Pagination & {
    data: Message[];
};
