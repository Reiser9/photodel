"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "../index.module.scss";

import { useTeam } from "@/features/team";
import { CirclePlus } from "@/shared/icons";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { Pro } from "@/shared/ui/Pro";
import { Button } from "@/shared/ui/Button";

const ProfileTeamWaiting = () => {
    const { getTeam, acceptRequestTeam, rejectRequestTeam } = useTeam();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["teamWaiting"],
        queryFn: () => getTeam({ status: "pending" }),
    });

    const queryClient = useQueryClient();

    const invalidateRequest = () => {
        queryClient.invalidateQueries({
            queryKey: ["teamWaiting"],
        });
    };

    const acceptRequestTeamHandler = (id: number) => {
        acceptRequestTeam(id, invalidateRequest);
    };

    const rejectRequestTeamHandler = (id: number) => {
        rejectRequestTeam(id, invalidateRequest);
    };

    return (
        <div className={styles.placesContent}>
            <div className={styles.actionTop}>
                <div className={styles.actionTopWrap}>
                    <p className={styles.actionTopCount}>
                        Всего: <span>{data?.length || 0}</span>
                    </p>
                </div>

                <div className={styles.actionTopWrap}>
                    <Link href="/profile/team/add" className={styles.addLink}>
                        <CirclePlus />
                        Добавить в команду
                    </Link>
                </div>
            </div>

            {isLoading ? (
                <Preloader small page />
            ) : isError ? (
                <NotContent
                    text="Произошла ошибка при загрузке данных"
                    danger
                />
            ) : !!data && !!data?.length ? (
                <div className={styles.teamItems}>
                    {data.map((data) => {
                        const { status, direction, user, id } = data || {};
                        const {
                            firstName,
                            lastName,
                            id: userId,
                            isPro,
                            avatarUrl,
                            location,
                            proCategories,
                            specializations,
                            distance,
                        } = user || {};
                        const { place } = location || {};
                        const { city } = place || {};

                        return (
                            <div className={styles.teamItem} key={id}>
                                <Link
                                    href={`/user/${userId}`}
                                    className={styles.teamItemImg}
                                >
                                    <Image
                                        src={
                                            avatarUrl ?? "/img/placeholder.png"
                                        }
                                        alt={`Аватар пользователя ${firstName} ${lastName}`}
                                        fill
                                    />
                                </Link>

                                <div className={styles.teamItemInfo}>
                                    <div className={styles.teamItemNameInner}>
                                        <Link
                                            href={`/user/${userId}`}
                                            className={styles.teamItemName}
                                        >
                                            {lastName} {firstName}
                                        </Link>

                                        {isPro && <Pro />}
                                    </div>

                                    {(!!proCategories?.length ||
                                        specializations) && (
                                        <div
                                            className={
                                                styles.teamItemCategories
                                            }
                                        >
                                            {!!proCategories?.length && (
                                                <p
                                                    className={
                                                        styles.teamItemCategoryMain
                                                    }
                                                >
                                                    {proCategories[0]?.name}
                                                </p>
                                            )}
                                            {specializations && (
                                                <p
                                                    className={
                                                        styles.teamItemCategoryOther
                                                    }
                                                >
                                                    {specializations.join(", ")}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {city && (
                                        <div
                                            className={styles.teamItemLocation}
                                        >
                                            <p
                                                className={
                                                    styles.teamItemLocationValue
                                                }
                                            >
                                                {city}
                                            </p>
                                            {distance && (
                                                <p
                                                    className={
                                                        styles.teamItemLocationDistance
                                                    }
                                                >
                                                    {distance} км
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {status === "pending" &&
                                        direction === "incoming" && (
                                            <p
                                                className={
                                                    styles.teamItemDirection
                                                }
                                            >
                                                Запрос мне
                                            </p>
                                        )}
                                    {status === "pending" &&
                                        direction === "outgoing" && (
                                            <p
                                                className={
                                                    styles.teamItemDirection
                                                }
                                            >
                                                Запрос от меня
                                            </p>
                                        )}

                                    {status === "pending" && (
                                        <p
                                            className={cn(
                                                styles.teamItemStatus,
                                                styles.yellow,
                                            )}
                                        >
                                            На рассмотрении
                                        </p>
                                    )}

                                    {status === "pending" &&
                                        direction === "incoming" && (
                                            <div
                                                className={
                                                    styles.teamItemButtons
                                                }
                                            >
                                                <Button
                                                    small
                                                    auto
                                                    onClick={() =>
                                                        acceptRequestTeamHandler(
                                                            id,
                                                        )
                                                    }
                                                >
                                                    Принять
                                                </Button>
                                                <Button
                                                    small
                                                    auto
                                                    color="danger"
                                                    onClick={() =>
                                                        rejectRequestTeamHandler(
                                                            id,
                                                        )
                                                    }
                                                >
                                                    Отклонить
                                                </Button>
                                            </div>
                                        )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <NotContent text="В ожидании принятия запроса людей нет" />
            )}
        </div>
    );
};

export default ProfileTeamWaiting;
