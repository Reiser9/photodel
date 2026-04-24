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

const ProfileUserLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const pathname = usePathname();
    const { id } = useParams();

    const { getShortInfo } = useUserInfo();

    const { data: myData } = useQuery({
        queryKey: ["shortInfo"],
        queryFn: () => getShortInfo(),
    });

    const { id: myId } = myData || {};

    const sidebarLinks = [
        {
            paths: [`/user/${id}`],
            name: "Профиль",
            icon: <Profile />,
            exact: true,
        },
        {
            paths: [`/user/${id}/photos`, `/user/${id}/photos/albums`],
            name: "Фотографии",
            icon: <Photo />,
            exact: true,
        },
        {
            paths: [`/user/${id}/places`],
            name: "Места для съемок",
            icon: <Pin2 />,
        },
        {
            paths: [`/user/${id}/photosessions`],
            name: "Фотосессии",
            icon: <Book />,
        },
        {
            paths: [`/user/${id}/trainings`],
            name: "Обучение",
            icon: <Text />,
        },
        {
            paths: [`/user/${id}/reviews`],
            name: "Отзывы",
            icon: <Reviews />,
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

    return (
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
                                        ? checkPathExact(pathname, data.paths)
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
    );
};

export default ProfileUserLayout;
