"use client";

import Image from "next/image";
import cn from "classnames";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "../index.module.scss";

import { useTrainings } from "@/features/trainings";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";

const RequestsTrainingPage = () => {
    const {
        getTrainingsRequest,
        acceptRequestTraining,
        rejectRequestTraining,
    } = useTrainings();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["trainingsRequests"],
        queryFn: () => getTrainingsRequest(),
    });

    const queryClient = useQueryClient();

    const revalidateQuery = () => {
        queryClient.invalidateQueries({ queryKey: ["trainingsRequests"] });
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
                        const { id, user, training, status } = data || {};
                        const {
                            avatarUrl,
                            firstName,
                            lastName,
                            id: userId,
                        } = user || {};
                        const {
                            format,
                            prepayment,
                            name,
                            id: trainingId,
                        } = training || {};

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
                                            {format && `Формат: ${format}`}
                                            {prepayment &&
                                                ` | Предоплата: ${prepayment}`}
                                        </span>

                                        <Link
                                            href={`/trainings/${trainingId}`}
                                            className={styles.requestsItemLink}
                                        >
                                            Обучение: {name}
                                        </Link>

                                        <span
                                            className={
                                                styles.requestsItemStatus
                                            }
                                        >
                                            {status === "pending" && "Новый"}
                                            {status === "accepted" && "Принят"}
                                            {status === "rejected" &&
                                                "Отклонён"}
                                        </span>
                                    </span>
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
                                                acceptRequestTraining(
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
                                                rejectRequestTraining(
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
                <NotContent text="Запросов на обучение нет" />
            )}
        </div>
    );
};

export default RequestsTrainingPage;
