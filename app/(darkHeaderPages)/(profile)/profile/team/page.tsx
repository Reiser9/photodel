"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "./index.module.scss";

import { Tabs } from "@/shared/ui/Tabs";
import { Pro } from "@/shared/ui/Pro";
import { useTeam } from "@/features/team";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { CirclePlus } from "@/shared/icons";
import { Button } from "@/shared/ui/Button";
import { ConfirmModal } from "@/shared/ui/Modal";

const ProfileTeamPage = () => {
    const [deleteTeamModal, setDeleteTeamModal] = React.useState(false);
    const [deleteRequestId, setDeleteRequestId] = React.useState(0);

    const { getTeam, acceptRequestTeam, rejectRequestTeam, removeTeam } =
        useTeam();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["team"],
        queryFn: () => getTeam({}),
    });

    const queryClient = useQueryClient();

    const invalidateRequest = () => {
        queryClient.invalidateQueries({
            queryKey: ["team"],
        });
    };

    const acceptRequestTeamHandler = (id: number) => {
        acceptRequestTeam(id, invalidateRequest);
    };

    const rejectRequestTeamHandler = (id: number) => {
        rejectRequestTeam(id, invalidateRequest);
    };

    const removeTeamHandler = (userId: number) => {
        removeTeam(userId, () => {
            invalidateRequest();
            setDeleteRequestId(0);
        });
    };

    return (
        <>
            <div className={styles.places}>
                <Tabs
                    tabs={[{ name: "Моя команда", href: "/profile/team" }]}
                    className={styles.placesTabs}
                />

                <div className={styles.placesContent}>
                    <div className={styles.actionTop}>
                        <div className={styles.actionTopWrap}>
                            <p className={styles.actionTopCount}>
                                Всего: <span>{data?.length || 0}</span>
                            </p>
                        </div>

                        <div className={styles.actionTopWrap}>
                            <Link
                                href="/profile/team/add"
                                className={styles.addLink}
                            >
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
                                const { status, direction, user, id } =
                                    data || {};
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
                                            {avatarUrl && (
                                                <Image
                                                    src={avatarUrl}
                                                    alt={`Аватар пользователя ${firstName} ${lastName}`}
                                                    fill
                                                />
                                            )}
                                        </Link>

                                        <div className={styles.teamItemInfo}>
                                            <div
                                                className={
                                                    styles.teamItemNameInner
                                                }
                                            >
                                                <Link
                                                    href={`/user/${userId}`}
                                                    className={
                                                        styles.teamItemName
                                                    }
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
                                                            {
                                                                proCategories[0]
                                                                    ?.name
                                                            }
                                                        </p>
                                                    )}
                                                    {specializations && (
                                                        <p
                                                            className={
                                                                styles.teamItemCategoryOther
                                                            }
                                                        >
                                                            {specializations.join(
                                                                ", ",
                                                            )}
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            {city && (
                                                <div
                                                    className={
                                                        styles.teamItemLocation
                                                    }
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

                                            {status === "rejected" && (
                                                <p
                                                    className={cn(
                                                        styles.teamItemStatus,
                                                        styles.red,
                                                    )}
                                                >
                                                    Отклонён
                                                </p>
                                            )}

                                            {status === "accepted" && (
                                                <p
                                                    className={cn(
                                                        styles.teamItemStatus,
                                                        styles.green,
                                                    )}
                                                >
                                                    Одобрен
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

                                            {status === "accepted" &&
                                                direction === "incoming" && (
                                                    <Button
                                                        color="danger"
                                                        auto
                                                        small
                                                        onClick={() => {
                                                            setDeleteTeamModal(
                                                                true,
                                                            );
                                                            setDeleteRequestId(
                                                                id,
                                                            );
                                                        }}
                                                    >
                                                        Удалить из списка
                                                    </Button>
                                                )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <NotContent text="В вашей команде пока пусто" />
                    )}
                </div>
            </div>

            <ConfirmModal
                title="Вы действительно хотите удалить пользователя из команды?"
                value={deleteTeamModal}
                setValue={setDeleteTeamModal}
                callback={() => removeTeamHandler(deleteRequestId)}
            />
        </>
    );
};

export default ProfileTeamPage;
