"use client";

import React from "react";

import styles from './index.module.scss';

import { Tabs } from "@/shared/ui/Tabs";

const FavoriteProfileLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Tabs
                tabs={[
                    { name: "Профили", href: "/profile/favorites" },
                    { name: "Фото", href: "/profile/favorites/photos" },
                    { name: "Места", href: "/profile/favorites/places" },
                    { name: "Фотосессии", href: "/profile/favorites/photosessions" },
                    { name: "Обучение", href: "/profile/favorites/trainings" },
                ]}
                className={styles.favTabs}
            />

            {children}
        </>
    );
};

export default FavoriteProfileLayout;
