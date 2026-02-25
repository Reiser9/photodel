'use client';

import { useAppDispatch, useAppSelector } from './useRedux';

import { addLocalNotify } from '@/store/slices/notify';
import { LocalNotify, TypesLocalNotify } from '@/entities/notify/model';

const useAlert = () => {
    const dispatch = useAppDispatch();

    const localNotifies = useAppSelector((state) => state.notify.localNotifies);

    const alertNotify = (title: string, text: string, type: TypesLocalNotify = 'success', time: number = 4000) => {
        if (localNotifies.length >= 3) {
            return;
        }

        const idNotify = new Date().getTime();

        const notifyObject: LocalNotify = {
            id: idNotify,
            title,
            text,
            type,
            time,
        };

        dispatch(addLocalNotify(notifyObject));
    };

    return {
        alertNotify,
    };
};

export default useAlert;
