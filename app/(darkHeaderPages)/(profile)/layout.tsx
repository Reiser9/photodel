import React from "react";
import Link from "next/link";
import cn from "classnames";

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

const ProfileLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <div className={styles.profile}>
            <div className={base.container}>
                <div className={styles.profileInner}>
                    <div className={styles.profileSidebar}>
                        <Link
                            href="/profile"
                            className={cn(
                                styles.profileSidebarLink,
                                styles.active,
                            )}
                        >
                            <Profile />
                            Мой профиль
                        </Link>

                        <Link
                            href="/profile"
                            className={styles.profileSidebarLink}
                        >
                            <Photo />
                            Фотографии
                        </Link>

                        <Link
                            href="/profile"
                            className={styles.profileSidebarLink}
                        >
                            <Pin2 />
                            Места для съемок
                        </Link>

                        <Link
                            href="/profile"
                            className={styles.profileSidebarLink}
                        >
                            <Book />
                            Фотосессии
                        </Link>

                        <Link
                            href="/profile"
                            className={styles.profileSidebarLink}
                        >
                            <Text />
                            Обучение
                        </Link>

                        <Link
                            href="/profile"
                            className={styles.profileSidebarLink}
                        >
                            <Team />
                            Команда
                        </Link>

                        <Link
                            href="/profile"
                            className={styles.profileSidebarLink}
                        >
                            <Reviews />
                            Отзывы
                        </Link>

                        <Link
                            href="/profile"
                            className={styles.profileSidebarLink}
                        >
                            <Edit />
                            Запросы
                        </Link>

                        <Link
                            href="/profile"
                            className={styles.profileSidebarLink}
                        >
                            <Bookmark2 />
                            Избранное
                        </Link>
                    </div>

                    <div className={styles.profileContent}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileLayout;
