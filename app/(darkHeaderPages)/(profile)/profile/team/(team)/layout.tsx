"use client";

import React from "react";

import styles from "./index.module.scss";

import { Tabs } from "@/shared/ui/Tabs";

const LayoutTeamPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className={styles.places}>
                <Tabs
                    tabs={[
                        { name: "Моя команда", href: "/profile/team" },
                        { name: "В ожидании", href: "/profile/team/waiting" },
                        { name: "Отклонили", href: "/profile/team/rejected" },
                    ]}
                    className={styles.placesTabs}
                />

                {children}
            </div>
        </>
    );
};

export default LayoutTeamPage;
