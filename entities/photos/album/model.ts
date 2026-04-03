import type { Pagination } from "@/entities/pagination";
import type { Favorite } from "@/entities/user";

export type AlbumDTO = {
    title: string;
    description: string;
    image: string;
    isPublished: boolean;
};

export type CreateAlbumDTO = AlbumDTO & {
    photoIds: number[];
};

export type Album = Omit<AlbumDTO, "photoIds" | "image"> & {
    id: number;
    createdAt: string;
    updatedAt: string;
    photosCount: number;
    imageKey: string;
    imageUrl: string;
    favorites: Favorite;
};

export type AlbumsPagination = Pagination & {
    data: Album[];
};
