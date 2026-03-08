import type { Pagination } from "@/entities/pagination";

export type AlbumDTO = {
    title: string;
    description: string;
    image: string;
    isPublished: boolean;
};

export type Album = AlbumDTO & {
    id: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
};

export type AlbumsPagination = Pagination & {
    data: Album[];
};
