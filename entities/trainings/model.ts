import type { Pagination } from "../pagination";
import type { PhotoShort, UserInfoShort } from "../photos/photo";
import type { Favorite, Like, Location, LocationDTO, Review } from "../user";
import type { TeamStatuses } from "../team";

export type TrainingDTO = {
    photoIds: number[];
    name: string;
    description: string;
    location: LocationDTO | null;
    type: string;
    format: string;
    startDate: string;
    endDate: string;
    price: string;
    prepayment: string;
    maxParticipants: number;
    isPublished: boolean;
    team: number[];
    organizers: number[];
};

export type Training = Omit<
    TrainingDTO,
    "photoIds" | "location" | "team" | "organizers" | "type"
> & {
    id: number;
    preview: PhotoShort;
    location: Location | null;
    createdAt: string;
    updatedAt: string;
    user: UserInfoShort;
    favorites: Favorite;
    likes: Like;
    reviews: Review;
};

export type TrainingById = Omit<Training, "preview"> & {
    photos: PhotoShort[];
    team: UserInfoShort[];
    organizers: UserInfoShort[];
    type: string;
    availableSpots: number;
    participants: [];
};

export type TrainingsPagination = Pagination & {
    data: Training[];
};

export type TrainingRequestDTO = {
    userId: number | string;
    trainingId: number | string;
};

export type TrainingRequest = {
    id: number;
    user: UserInfoShort;
    status: TeamStatuses;
    training: Training;
    createdAt: string;
    updatedAt: string;
};
