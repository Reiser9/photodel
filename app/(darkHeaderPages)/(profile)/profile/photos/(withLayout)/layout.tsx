"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import styles from "./index.module.scss";

import { Rating } from "@/shared/ui/Rating";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { Tabs } from "@/shared/ui/Tabs";
import { useUserInfo } from "@/features/user";

const ProfilePhotoLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { getShortInfo } = useUserInfo();

    const { data, isLoading } = useQuery({
        queryKey: ["shortInfo"],
        queryFn: () => getShortInfo(),
        gcTime: 0,
        refetchOnMount: true,
    });

    const { avatar, firstName, isPro, lastName } = data || {};

    return (
        <div className={styles.photos}>
            {/* <div className={styles.photosTop}>
                <UserInfoBlock
                    image={avatar}
                    name={firstName || ""}
                    surname={lastName || ""}
                    isPro={isPro}
                    size="medium"
                />

                <Rating rating="4.92" />
            </div> */}

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
