import type { Pagination } from "../pagination";
import type { UserInfoShort } from "../photos/photo";
import type { TeamStatuses } from "../team";
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
    reviews: { count: number };
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

export type LocationCountry = {
    id: number;
    country: string;
    city: string;
    latitude: number;
    longitude: number;
};

export type LocationCountriesPagination = Pagination & {
    data: LocationCountry[];
};

export type PlaceRequestDTO = {
    userId: number;
    date: string;
    durationHours: number;
    location: LocationDTO | null;
    type: string;
    peoplesCount: number;
    budget: string;
    needsMakeupArtist: boolean;
    comment: string;
};

export type PlaceRequest = Omit<PlaceRequestDTO, "userId" | "location"> & {
    id: number;
    user: UserInfoShort;
    status: TeamStatuses;
    location: Location | null;
    createdAt: string;
    updatedAt: string;
};
