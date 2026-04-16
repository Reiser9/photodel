import type { Pagination } from "@/entities/pagination";
import type {
    Favorite,
    Like,
    Location,
    LocationDTO,
    Specialization,
} from "@/entities/user";
import type { Album } from "../album";

export type PhotoDTO = {
    image: string;
    name: string;
    description: string;
    aperture: string;
    camera: string;
    flash: string;
    focalLength: string;
    isForSale: boolean;
    isPublished: boolean;
    iso: number | null;
    location: LocationDTO | null;
    shutterSpeed: string;
    albumIds: number[];
    specializationIds: number[];
};

export type Photo = Omit<
    PhotoDTO,
    "specializationIds" | "albumIds" | "image"
> & {
    id: number;
    createdAt: string;
    updatedAt: string;
    specializations: Specialization[];
    albums: Album[];
    location: Location | null;
    imageKey: string;
    imageUrl: string;
    user: UserInfoShort;
    favorites: Favorite;
    likes: Like;
    reviews: { count: number; rating: number };
};

export type UserInfoShort = {
    id: number;
    firstName: string;
    lastName: string;
    avatarKey: string;
    avatarUrl: string;
    isPro: boolean;
};

export type PhotosPagination = Pagination & {
    data: Photo[];
};

export type PhotoShort = {
    id: number;
    key: string;
    url: string;
};
