export type TypesLocalNotify = 'success' | 'info' | 'warn' | 'error';

export type LocalNotify = {
    id: number;
    title: string;
    text: string;
    type: TypesLocalNotify;
    time: number;
};
