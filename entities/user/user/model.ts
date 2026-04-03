import type { Pagination } from "@/entities/pagination";

export type UserInfo = {
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        avatarUrl: string;
        avatarKey: string;
        isAdult: boolean;
        isProfessional: boolean;
        isVerified: boolean;
        createdAt: string;
        roles: Roles;
        isPro: boolean;
    };
};

export type Category = {
    id: number;
    name: string;
};

export type Specialization = Category;

export type Social = {
    id: number;
    name: string;
    icon: string;
};

export type SocialUser = Social & {
    value: string;
};

export type TempLocationDTO = {
    startDate: string;
    endDate: string;
    comment: string;
    location: LocationDTO;
};

export type TempLocation = TempLocationDTO & {
    id: number;
    location: Location;
};

export type LocationDTO = {
    latitude: number;
    longitude: number;
    address: string;
};

export type Location = LocationDTO & {
    id: number;
};

export type ProfileInfo = {
    profile: {
        id: number;
        firstName: string;
        lastName: string;
        avatar: string;
        isProfessional: boolean;
        isPro: boolean;
        createdAt: string;
        price: string;
        status: string;
        conditions: string;
        equipment: string;
        geography: string[];
        languages: string[];
        about: string;
        proCategories: Category[];
        specializations: Specialization[];
        socials: SocialUser[];
        location: Location;
        activeTemporaryLocation: TempLocation;
        temporaryLocations: TempLocation[];
        favorites: Favorite;
    };
};

export type ProfileInfoDTO = {
    status: string;
    price: string;
    conditions: string;
    equipment: string;
    geography: string[];
    languages: string[];
    about: string;
    location: LocationDTO | null;
    proCategoryIds: number[];
    specializationIds: number[];
    socials: SocialUser[];
    temporaryLocations: TempLocationDTO[] | null;
};

export type Roles = ("ADMIN" | "MODERATOR")[];

export type Favorite = {
    count: number;
    favoriteId: number | null;
    isFavorite: boolean;
};

export type Like = {
    count: number;
    likeId: number | null;
    isLiked: boolean;
};

export type UserByIdShortInfo = {
    id: number;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
    avatarKey: string | null;
    isPro: boolean;
    distance: string | null;
    favorites: Favorite;
    location: Location | null;
    proCategories: Category[];
    specializations: Specialization[];
};

export type UsersPagination = Pagination & {
    data: UserByIdShortInfo[];
};
