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
    value: string;
};

export type TempLocation = {
    id: number;
    startDate: Date;
    endDate: Date;
    longitude: number;
    latitude: number;
    comment: string;
};

export type ProfileInfo = {
    profile: {
        id: number;
        price: string;
        conditions: string;
        equipment: string;
        geography: string[];
        languages: string[];
        about: string;
        proCategories: Category[];
        specializations: Specialization[];
        socials: Social[];
        temporaryLocations: TempLocation[];
    };
};

export type Roles = ("ADMIN" | "MODERATOR")[];
