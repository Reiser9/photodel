"use client";

import React from "react";
import Link from "next/link";
import cn from "classnames";
import { usePathname } from "next/navigation";

import styles from "./index.module.scss";
import base from "@/shared/styles/base.module.scss";

import {
    Book,
    Bookmark2,
    Edit,
    Photo,
    Pin2,
    Profile,
    Reviews,
    Team,
    Text,
} from "@/shared/icons";

const sidebarLinks = [
    {
        path: "/profile",
        name: "Мой профиль",
        icon: <Profile />,
        exact: true,
    },
    {
        path: "/profile/photos",
        name: "Фотографии",
        icon: <Photo />,
    },
    {
        path: "/profile/places",
        name: "Места для съемок",
        icon: <Pin2 />,
    },
    {
        path: "/profile/photosessions",
        name: "Фотосессии",
        icon: <Book />,
    },
    {
        path: "/profile/trainings",
        name: "Обучение",
        icon: <Text />,
    },
    {
        path: "/profile/team",
        name: "Команда",
        icon: <Team />,
    },
    {
        path: "/profile/reviews",
        name: "Отзывы",
        icon: <Reviews />,
    },
    {
        path: "/profile/requests",
        name: "Запросы",
        icon: <Edit />,
    },
    {
        path: "/profile/favorites",
        name: "Избранное",
        icon: <Bookmark2 />,
    },
];

const ProfileLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const pathname = usePathname();

    return (
        <div className={styles.profile}>
            <div className={base.container}>
                <div className={styles.profileInner}>
                    <div className={styles.profileSidebar}>
                        {sidebarLinks.map((data, id) => (
                            <Link
                                key={id}
                                href={data.path}
                                className={cn(styles.profileSidebarLink, {
                                    [styles.active]: data.exact
                                        ? pathname === data.path
                                        : pathname.startsWith(data.path),
                                })}
                            >
                                {data.icon}
                                {data.name}
                            </Link>
                        ))}
                    </div>

                    <div className={styles.profileContent}>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default ProfileLayout;
