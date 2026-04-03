"use client";

import React from "react";
import Link from "next/link";
import cn from "classnames";
import { useParams, usePathname } from "next/navigation";

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

const ProfileUserLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const pathname = usePathname();
    const { id } = useParams();

    const sidebarLinks = [
        {
            path: `/user/${id}`,
            name: "Профиль",
            icon: <Profile />,
            exact: true,
        },
        {
            path: `/user/${id}/photos`,
            name: "Фотографии",
            icon: <Photo />,
        },
        {
            path: `/user/${id}/places`,
            name: "Места для съемок",
            icon: <Pin2 />,
        },
        {
            path: `/user/${id}/photosessions`,
            name: "Фотосессии",
            icon: <Book />,
        },
        {
            path: `/user/${id}/trainings`,
            name: "Обучение",
            icon: <Text />,
        },
        {
            path: `/user/${id}/team`,
            name: "Команда",
            icon: <Team />,
        },
        {
            path: `/user/${id}/reviews`,
            name: "Отзывы",
            icon: <Reviews />,
        },
        {
            path: `/user/${id}/requests`,
            name: "Запросы",
            icon: <Edit />,
        },
    ];

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

export default ProfileUserLayout;
