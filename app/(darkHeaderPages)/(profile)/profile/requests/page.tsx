"use client";

import React from "react";

import styles from "./index.module.scss";

import { usePlaces } from "@/features/places";
import { useQuery } from "@tanstack/react-query";
import { Tabs } from "@/shared/ui/Tabs";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/shared/utils/formatDate";

const ProfileRequests = () => {
    const { getPlacesRequest } = usePlaces();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["placesRequests"],
        queryFn: () => getPlacesRequest(),
    });

    return (
        <div className={styles.requests}>
            <Tabs tabs={[{ name: "Запросы на съемку" }]} />

            <div className={styles.requestsContent}>
                <p className={styles.requestsCount}>
                    Всего: <span>{data?.length || 0}</span>
                </p>

                {isLoading ? (
                    <Preloader small page />
                ) : isError ? (
                    <NotContent
                        text="Произошла ошибка при загрузке данных"
                        danger
                    />
                ) : data && !!data?.length ? (
                    <div className={styles.requestsItems}>
                        {data.map((data) => {
                            const { id, user, location, date, durationHours, status } = data || {};
                            const { avatarUrl, firstName, lastName } = user || {};
                            const { place } = location || {};
                            const { city } = place || {};

                            return (
                                <Link
                                    key={id}
                                    href="/"
                                    className={styles.requestsItem}
                                >
                                    <span className={styles.requestsItemImage}>
                                        {avatarUrl && <Image src={avatarUrl} alt={`Аватар пользователя ${firstName} ${lastName}`} fill />}
                                    </span>

                                    <span className={styles.requestsItemContent}>
                                        <span className={styles.requestsItemInfo}>
                                            <span className={styles.requestsItemName}>
                                                {lastName} {firstName}
                                            </span>

                                            <span className={styles.requestsItemShort}>
                                                {city} | {formatDate(date)} | {durationHours} ч.
                                            </span>

                                            <span className={styles.requestsItemStatus}>
                                                {status === "pending" && "Новый"}
                                                {status === "accepted" && "Принят"}
                                                {status === "rejected" && "Отклонён"}
                                            </span>
                                        </span>

                                        <span>
                                            
                                        </span>
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <NotContent text="Запросов на съемку нет" />
                )}
            </div>
        </div>
    );
};

export default ProfileRequests;
