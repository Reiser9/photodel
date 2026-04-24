import type { UserByIdShortInfo } from "../user";

export type TeamStatuses = "pending" | "accepted" | "rejected";
export type TeamDirections = "outgoing" | "incoming";

export type TeamItem = {
    id: number;
    status: TeamStatuses;
    direction: TeamDirections;
    user: UserByIdShortInfo;
    createdAt: string;
    updatedAt: string;
};

export type TempTeamItem = {
    label: string;
    value: number;
    lastName: string;
    image: string;
    isPro: boolean;
    category: string;
};
