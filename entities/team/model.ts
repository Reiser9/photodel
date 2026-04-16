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
