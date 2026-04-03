import type { Pagination } from "../pagination";
import type { UserInfoShort } from "../photos/photo/model";
import type {
    Favorite,
    Like,
    LocationDTO,
    Location,
    Specialization,
} from "../user";

export type Place = {
    id: number;
    preview: {
        id: number;
        key: string;
        url: string;
    };
    name: string;
    description: string;
    location: Location | null;
    camera: string;
    price: string;
    conditions: string;
    isPublished: boolean;
    specializations: Specialization[];
    createdAt: string;
    updatedAt: string;
    user: UserInfoShort;
    favorites: Favorite;
    likes: Like;
};

export type PlaceById = Omit<Place, "preview"> & {
    photos: {
        id: number;
        key: string;
        url: string;
    }[];
};

export type PlaceDTO = {
    photoIds: number[];
    name: string;
    description: string;
    location: LocationDTO | null;
    camera: string;
    price: string;
    conditions: string;
    isPublished: boolean;
    specializationIds: number[];
};

export type PlacesPagination = Pagination & {
    data: Place[];
};
