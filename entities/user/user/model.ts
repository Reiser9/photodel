export type UserInfo = {
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        avatar: string;
        isAdult: boolean;
        isProfessional: boolean;
        isVerified: boolean;
        createdAt: Date;
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

export type TempLocation = {
    id: number;
    startDate: Date;
    endDate: Date;
    comment: string;
    location: Location;
};

export type LocationDTO = {
    latitude: number;
    longitude: number;
    country: string;
    city: string;
    street: string;
    houseNumber: string;
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
        createdAt: Date;
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
        temporaryLocation: TempLocation;
        temporaryLocations: TempLocation[];
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
    temporaryLocations: TempLocation[] | null;
};

export type Roles = ("ADMIN" | "MODERATOR")[];
