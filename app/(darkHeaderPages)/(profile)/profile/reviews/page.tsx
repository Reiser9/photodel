"use client";

import React from "react";
import cn from "classnames";
import { useQuery } from "@tanstack/react-query";

import styles from "./index.module.scss";

import { Checkbox } from "@/shared/ui/Checkbox";
import { ReviewItem } from "@/entities/review/ui";
import { useReviews } from "@/features/reviews";
import { useUserInfo } from "@/features/user";
import { Pagination } from "@/shared/ui/Pagination";
import { NotContent } from "@/shared/ui/NotContent";
import { Preloader } from "@/shared/ui/Preloader";
import { Comment2, Warn } from "@/shared/icons";

const ReviewsPage = () => {
    const [page, setPage] = React.useState(1);

    const { getReviews } = useReviews();

    const { getShortInfo } = useUserInfo();

    const { data: myData } = useQuery({
        queryKey: ["shortInfo"],
        queryFn: () => getShortInfo(),
        gcTime: 0,
        refetchOnMount: true,
    });

    const { id: myId } = myData || {};

    const { data, isLoading, isError } = useQuery({
        queryKey: ["usersReviewsById", myId],
        queryFn: () => getReviews({ type: "user", entity_id: +(myId || 0) }),
        enabled: !!myId,
    });

    const { data: reviews, total, totalPages } = data || {};

    return (
        <>
            <div className={styles.reviewsTop}>
                <p className={styles.reviewsCount}>
                    Всего: <span>{total}</span>
                </p>

                {/* <Checkbox label="Только с фото" id="with_photo" auto /> */}
            </div>

            {isLoading ? (
                <Preloader page small />
            ) : isError ? (
                <NotContent
                    text="Произошла ошибка при загрузке данных"
                    danger
                />
            ) : !!reviews?.length ? (
                <div className={styles.reviewsItems}>
                    {reviews.map((data) => (
                        <ReviewItem
                            key={data.id}
                            data={data}
                            actions={
                                <>
                                    {data.user.id === myId && (
                                        <div
                                            className={
                                                styles.reviewsItemButtons
                                            }
                                        >
                                            <button
                                                className={
                                                    styles.reviewsItemButton
                                                }
                                            >
                                                <Comment2 />
                                                Прокомментировать
                                            </button>

                                            <button
                                                className={cn(
                                                    styles.reviewsItemButton,
                                                    styles.danger,
                                                )}
                                            >
                                                <Warn />
                                                Пожаловаться
                                            </button>
                                        </div>
                                    )}
                                </>
                            }
                        />
                    ))}
                </div>
            ) : (
                <NotContent text="У вас еще нет отзывов" />
            )}

            <Pagination
                page={page}
                setPage={setPage}
                totalPages={totalPages || 0}
                isLoading={isLoading}
            />
        </>
    );
};

export default ReviewsPage;
