"use client";

import Image from "next/image";
import cn from "classnames";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "./index.module.scss";

import { usePlaces } from "@/features/places";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { formatDate } from "@/shared/utils/formatDate";

const ProfileRequests = () => {
    const { getPlacesRequest, rejectRequestPlace, acceptRequestPlace } =
        usePlaces();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["placesRequests"],
        queryFn: () => getPlacesRequest(),
    });

    const queryClient = useQueryClient();

    const revalidateQuery = () => {
        queryClient.invalidateQueries({ queryKey: ["placesRequests"] });
    };

    return (
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
                        const {
                            id,
                            user,
                            location,
                            date,
                            durationHours,
                            status,
                        } = data || {};
                        const {
                            avatarUrl,
                            firstName,
                            lastName,
                            id: userId,
                        } = user || {};
                        const { place } = location || {};
                        const { city } = place || {};

                        return (
                            <div key={id} className={styles.requestsItem}>
                                <Link
                                    href={`/user/${userId}`}
                                    className={styles.requestsItemImage}
                                >
                                    <Image
                                        src={
                                            avatarUrl ?? "/img/placeholder.png"
                                        }
                                        alt={`Аватар пользователя ${firstName} ${lastName}`}
                                        fill
                                    />
                                </Link>

                                <span className={styles.requestsItemContent}>
                                    <span className={styles.requestsItemInfo}>
                                        <Link
                                            href={`/user/${userId}`}
                                            className={styles.requestsItemName}
                                        >
                                            {lastName} {firstName}
                                        </Link>

                                        <span
                                            className={styles.requestsItemShort}
                                        >
                                            {city} | {formatDate(date)} |{" "}
                                            {durationHours} ч.
                                        </span>

                                        <span
                                            className={cn(
                                                styles.requestsItemStatus,
                                                {
                                                    [styles.red]:
                                                        status === "rejected",
                                                },
                                            )}
                                        >
                                            {status === "pending" && "Новый"}
                                            {status === "accepted" && "Принят"}
                                            {status === "rejected" &&
                                                "Отклонён"}
                                        </span>
                                    </span>

                                    <span></span>
                                </span>

                                {status === "pending" && (
                                    <span
                                        className={styles.requestsItemButtons}
                                    >
                                        <button
                                            className={
                                                styles.requestsItemButton
                                            }
                                            onClick={() =>
                                                acceptRequestPlace(
                                                    id,
                                                    revalidateQuery,
                                                )
                                            }
                                        >
                                            Принять
                                        </button>

                                        <button
                                            className={cn(
                                                styles.requestsItemButton,
                                                styles.red,
                                            )}
                                            onClick={() =>
                                                rejectRequestPlace(
                                                    id,
                                                    revalidateQuery,
                                                )
                                            }
                                        >
                                            Отклонить
                                        </button>
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <NotContent text="Запросов на съемку нет" />
            )}
        </div>
    );
};

export default ProfileRequests;
