import type { FavoriteEntites } from "../favorite";
import { Pagination } from "../pagination";
import type { PhotoShort, UserInfoShort } from "../photos/photo";

export type Review = {
    id: number;
    entityType: FavoriteEntites;
    entityId: number;
    entity: UserInfoShort | null;
    content: string;
    rating: number;
    isPublished: boolean;
    photos: PhotoShort[];
    user: UserInfoShort;
    createdAt: string;
    updatedAt: string;
};

export type ReviewDTO = {
    entityType: FavoriteEntites;
    entityId: number;
    content: string;
    rating?: number;
    photoIds: number[];
};

export type ReviewsPagination = Pagination & {
    data: Review[];
};
