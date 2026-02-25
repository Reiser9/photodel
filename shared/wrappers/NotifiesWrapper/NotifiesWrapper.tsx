"use client";

import React from "react";

import styles from "./index.module.scss";

import { useAppSelector } from "@/shared/hooks/useRedux";
import { Notify } from "@/shared/ui/Notify";

const NotifiesWrapper = ({ children }: { children: React.ReactNode }) => {
    const localNotifies = useAppSelector((state) => state.notify.localNotifies);

    return (
        <>
            {localNotifies.length > 0 && (
                <div className={styles.notifyContent}>
                    {localNotifies.map((data) => (
                        <Notify key={data.id} data={data} />
                    ))}
                </div>
            )}

            {children}
        </>
    );
};

export default NotifiesWrapper;
