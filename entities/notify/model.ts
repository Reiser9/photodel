export type TypesLocalNotify = "success" | "info" | "warn" | "error";

export type LocalNotify = {
    id: number;
    title: string;
    text: string;
    type: TypesLocalNotify;
    time: number;
};

export type Notify = {
    filming: number;
    training: number;
    team: number;
    unreadChats: number;
    total: number;
};
