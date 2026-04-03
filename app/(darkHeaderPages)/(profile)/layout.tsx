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
    Message,
    Money2,
    Photo,
    Pin2,
    Profile,
    Reviews,
    Settings,
    Team,
    Text,
} from "@/shared/icons";
import { AuthWrapper } from "@/shared/wrappers/AuthWrapper";

const sidebarLinks = [
    {
        paths: ["/profile", "/profile/edit"],
        name: "Мой профиль",
        icon: <Profile />,
        exact: true,
    },
    {
        paths: ["/profile/requests"],
        name: "Запросы",
        icon: <Edit />,
    },
    {
        paths: ["/profile/messanger"],
        name: "Сообщения",
        icon: <Message />,
    },
    {
        paths: ["/profile/photos"],
        name: "Фотографии",
        icon: <Photo />,
    },
    {
        paths: ["/profile/places"],
        name: "Места для съемок",
        icon: <Pin2 />,
    },
    {
        paths: ["/profile/photosessions"],
        name: "Фотосессии",
        icon: <Book />,
    },
    {
        paths: ["/profile/trainings"],
        name: "Обучение",
        icon: <Text />,
    },
    {
        paths: ["/profile/team"],
        name: "Команда",
        icon: <Team />,
    },
    {
        paths: ["/profile/reviews"],
        name: "Отзывы",
        icon: <Reviews />,
    },
    {
        paths: ["/profile/favorites"],
        name: "Избранное",
        icon: <Bookmark2 />,
    },
    {
        paths: ["/profile/finance"],
        name: "Финансы",
        icon: <Money2 />,
    },
    {
        paths: ["/profile/settings"],
        name: "Настройки",
        icon: <Settings />,
    },
];

const ProfileLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const pathname = usePathname();

    const checkPathExact = (pathname: string, paths: string[]) => {
        let pathIsActive = false;

        paths.forEach((path) => {
            if (path === pathname) {
                pathIsActive = true;
            }
        });

        return pathIsActive;
    };

    return (
        <AuthWrapper>
            <div className={styles.profile}>
                <div className={base.container}>
                    <div className={styles.profileInner}>
                        <div className={styles.profileSidebar}>
                            {sidebarLinks.map((data, id) => (
                                <Link
                                    key={id}
                                    href={data.paths[0]}
                                    className={cn(styles.profileSidebarLink, {
                                        [styles.active]: data.exact
                                            ? checkPathExact(
                                                  pathname,
                                                  data.paths,
                                              )
                                            : pathname.includes(data.paths[0]),
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
        </AuthWrapper>
    );
};

export default ProfileLayout;
