"use client";

import React from "react";

import styles from "./index.module.scss";

import { Tabs } from "@/shared/ui/Tabs";

const ProfileReviewsLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <div className={styles.reviews}>
            <Tabs
                tabs={[
                    { name: "Отзывы обо мне", href: "/profile/reviews" },
                    { name: "Мои отзывы", href: "/profile/reviews/me" },
                ]}
                className={styles.photosTabs}
            />

            <div className={styles.reviewsContent}>{children}</div>
        </div>
    );
};

export default ProfileReviewsLayout;
