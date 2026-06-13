"use client";

import React from "react";
import Link from "next/link";
import cn from "classnames";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

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
import { useNotify } from "@/features/notify";
import { useUserInfo } from "@/features/user";

const sidebarLinks = [
    {
        paths: ["/profile", "/profile/edit"],
        name: "Мой профиль",
        icon: <Profile />,
        exact: true,
        hideForNotProfessional: false,
    },
    {
        paths: ["/profile/requests"],
        name: "Запросы",
        icon: <Edit />,
        hideForNotProfessional: true,
    },
    {
        paths: ["/profile/messanger"],
        name: "Сообщения",
        icon: <Message />,
        hideForNotProfessional: false,
    },
    {
        paths: [
            "/profile/photos",
            "/profile/photos/albums",
            "/profile/photos/add",
            "/profile/albums/add",
        ],
        name: "Фотографии",
        icon: <Photo />,
        exact: true,
        hideForNotProfessional: true,
    },
    {
        paths: ["/profile/places"],
        name: "Места для съемок",
        icon: <Pin2 />,
        hideForNotProfessional: true,
    },
    {
        paths: ["/profile/photosessions"],
        name: "Фотосессии",
        icon: <Book />,
        hideForNotProfessional: true,
    },
    {
        paths: ["/profile/trainings"],
        name: "Обучение",
        icon: <Text />,
        hideForNotProfessional: true,
    },
    {
        paths: ["/profile/team"],
        name: "Команда",
        icon: <Team />,
        hideForNotProfessional: true,
    },
    {
        paths: ["/profile/reviews"],
        name: "Отзывы",
        icon: <Reviews />,
        hideForNotProfessional: false,
    },
    {
        paths: ["/profile/favorites"],
        name: "Избранное",
        icon: <Bookmark2 />,
        hideForNotProfessional: false,
    },
    // {
    //     paths: ["/profile/finance"],
    //     name: "Финансы",
    //     icon: <Money2 />,
    // },
    {
        paths: ["/profile/settings"],
        name: "Настройки",
        icon: <Settings />,
        hideForNotProfessional: false,
    },
];

const ProfileLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { getNotifies } = useNotify();
    const { getShortInfo } = useUserInfo();

    const { data } = useQuery({
        queryKey: ["shortInfo"],
        queryFn: () => getShortInfo(),
        gcTime: 0,
        refetchOnMount: true,
    });

    const { isProfessional } = data || {};

    const { data: notifies } = useQuery({
        queryKey: ["messangerUnreadCount"],
        queryFn: () => getNotifies(),
    });

    const { unreadChats } = notifies || {};

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
                            {sidebarLinks.map((data, id) => {
                                const {
                                    hideForNotProfessional,
                                    icon,
                                    name,
                                    paths,
                                    exact,
                                } = data || {};

                                if (hideForNotProfessional && !isProfessional) {
                                    return;
                                }

                                return (
                                    <Link
                                        key={id}
                                        href={paths[0]}
                                        className={cn(
                                            styles.profileSidebarLink,
                                            {
                                                [styles.active]: exact
                                                    ? checkPathExact(
                                                          pathname,
                                                          paths,
                                                      )
                                                    : pathname.includes(
                                                          paths[0],
                                                      ),
                                            },
                                        )}
                                    >
                                        {icon}
                                        {name}
                                        {name === "Сообщения" &&
                                            !!unreadChats && (
                                                <span
                                                    className={
                                                        styles.profileSidebarNumber
                                                    }
                                                >
                                                    {unreadChats}
                                                </span>
                                            )}
                                    </Link>
                                );
                            })}
                        </div>

                        <div className={styles.profileContent}>{children}</div>
                    </div>
                </div>
            </div>
        </AuthWrapper>
    );
};

export default ProfileLayout;
