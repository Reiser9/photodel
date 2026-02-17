"use client";

import React from "react";

import styles from "./index.module.scss";

import { Rating } from "@/shared/ui/Rating";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { Tabs } from "@/shared/ui/Tabs";

const ProfilePhotoLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <div className={styles.photos}>
            <div className={styles.photosTop}>
                <UserInfoBlock
                    image="/img/people1.png"
                    name="Иванов"
                    surname="Александр"
                    id={1}
                    isPro
                    size="medium"
                />

                <Rating rating="4.92" />
            </div>

            <Tabs
                tabs={[
                    { name: "Фотографии", href: "/profile/photos" },
                    { name: "Альбомы", href: "/profile/photos/albums" },
                ]}
                className={styles.photosTabs}
            />

            <div className={styles.photosContent}>{children}</div>
        </div>
    );
};

export default ProfilePhotoLayout;
