import type { Pagination } from "../pagination";
import type { PhotoShort, UserInfoShort } from "../photos/photo";
import type {
    Favorite,
    Like,
    Location,
    LocationDTO,
    Specialization,
} from "../user";

export type PhotosessionDTO = {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    specializationId: number;
    isPublished: boolean;
    photoIds: number[];
    location: LocationDTO | null;
    team: number[];
};

export type Photosession = Omit<
    PhotosessionDTO,
    "photoIds" | "team" | "specializationId"
> & {
    id: number;
    preview: PhotoShort;
    location: Location | null;
    team: UserInfoShort[];
    createdAt: string;
    updatedAt: string;
    user: UserInfoShort;
    favorites: Favorite;
    likes: Like;
    reviews: {
        count: number;
    };
    specialization: Specialization;
};

export type PhotosessionById = Omit<Photosession, "preview"> & {
    photos: PhotoShort[];
};

export type PhotosessionsPagination = Pagination & {
    data: Photosession[];
};
