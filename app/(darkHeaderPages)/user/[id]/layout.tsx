"use client";

import React from "react";
import Link from "next/link";
import cn from "classnames";
import { redirect, useParams, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

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
import { useUserInfo } from "@/features/user";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";

const ProfileUserLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const pathname = usePathname();
    const { id } = useParams();

    const { getShortInfo, getUserProfileById } = useUserInfo();

    const { data: myData } = useQuery({
        queryKey: ["shortInfo"],
        queryFn: () => getShortInfo(),
    });

    const { data, isLoading, isError } = useQuery({
        queryKey: ["userProfileInfo", id],
        queryFn: () => getUserProfileById(String(id)),
        gcTime: 0,
        refetchOnMount: true,
        enabled: !!id,
    });

    const { isProfessional } = data || {};

    const { id: myId } = myData || {};

    const sidebarLinks = [
        {
            paths: [`/user/${id}`],
            name: "Профиль",
            icon: <Profile />,
            exact: true,
            hideForNotProfessional: false,
        },
        {
            paths: [`/user/${id}/photos`, `/user/${id}/photos/albums`],
            name: "Фотографии",
            icon: <Photo />,
            exact: true,
            hideForNotProfessional: true,
        },
        {
            paths: [`/user/${id}/places`],
            name: "Места для съемок",
            icon: <Pin2 />,
            hideForNotProfessional: true,
        },
        {
            paths: [`/user/${id}/photosessions`],
            name: "Фотосессии",
            icon: <Book />,
            hideForNotProfessional: true,
        },
        {
            paths: [`/user/${id}/trainings`],
            name: "Обучение",
            icon: <Text />,
            hideForNotProfessional: true,
        },
        {
            paths: [`/user/${id}/reviews`],
            name: "Отзывы",
            icon: <Reviews />,
            hideForNotProfessional: false,
        },
    ];

    const checkPathExact = (pathname: string, paths: string[]) => {
        let pathIsActive = false;

        paths.forEach((path) => {
            if (path === pathname) {
                pathIsActive = true;
            }
        });

        return pathIsActive;
    };

    React.useEffect(() => {
        if (myId == id) {
            redirect("/profile");
        }
    }, [id, myId]);

    if (isLoading) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent text="Произошла ошибка при загрузе данных" danger />;
    }

    if (!data) {
        return <NotContent text="Пользователь не найден" danger />;
    }

    return (
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
                                    className={cn(styles.profileSidebarLink, {
                                        [styles.active]: exact
                                            ? checkPathExact(pathname, paths)
                                            : pathname.includes(paths[0]),
                                    })}
                                >
                                    {icon}
                                    {name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className={styles.profileContent}>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default ProfileUserLayout;
