import type { Pagination } from "@/entities/pagination";
import type { Location, LocationDTO, Specialization } from "@/entities/user";

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
    iso: number;
    location: LocationDTO | null;
    shutterSpeed: string;
    albumIds: number[];
    specializationIds: number[];
};

export type Photo = Omit<PhotoDTO, "specializationIds" | "albumIds"> & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    specializations: Specialization[];
    albums: [];
    location: Location | null;
};

export type PhotosPagination = Pagination & {
    data: Photo[];
};
