"use client";

import React from "react";
import cn from "classnames";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "../index.module.scss";

import type { UserInfoShort } from "@/entities/photos/photo";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { Edit2, Remove } from "@/shared/icons";
import { useReviews } from "@/features/reviews";
import { Pagination } from "@/shared/ui/Pagination";
import { NotContent } from "@/shared/ui/NotContent";
import { ReviewItem } from "@/entities/review/ui";
import { Preloader } from "@/shared/ui/Preloader";
import { ConfirmModal } from "@/shared/ui/Modal";

const ReviewsMePage = () => {
    const [page, setPage] = React.useState(1);
    const [deleteModal, setDeleteModal] = React.useState(false);

    const [reviewId, setReviewId] = React.useState(0);

    const { getReviews, deleteReview } = useReviews();

    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["usersReviewsById"],
        queryFn: () => getReviews({ type: "user", my: true }),
    });

    const { data: reviews, total, totalPages } = data || {};

    const deleteReviewHandler = () => {
        deleteReview(reviewId, () => {
            setDeleteModal(false);
            setReviewId(0);
            queryClient.invalidateQueries({ queryKey: ["usersReviewsById"] });
        });
    };

    return (
        <>
            <p className={styles.reviewsCount}>
                Всего: <span>{total}</span>
            </p>

            {isLoading ? (
                <Preloader page small />
            ) : isError ? (
                <NotContent
                    text="Произошла ошибка при загрузке данных"
                    danger
                />
            ) : !!reviews?.length ? (
                <div className={styles.reviewsItems}>
                    {reviews.map((data) => {
                        const { entity, id } = data || {};
                        const {
                            avatarUrl,
                            firstName,
                            lastName,
                            isPro,
                            id: entityId,
                        } = (entity as UserInfoShort) || {};

                        return (
                            <ReviewItem
                                key={id}
                                data={data}
                                actions={
                                    <div className={styles.reviewsItemButtons}>
                                        <button
                                            className={styles.reviewsItemButton}
                                        >
                                            <Edit2 />
                                            Редактировать
                                        </button>

                                        <button
                                            className={cn(
                                                styles.reviewsItemButton,
                                                styles.danger,
                                            )}
                                            onClick={() => {
                                                setDeleteModal(true);
                                                setReviewId(id);
                                            }}
                                        >
                                            <Remove />
                                            Удалить
                                        </button>
                                    </div>
                                }
                                topBlock={
                                    <div className={styles.reviewsItemTo}>
                                        <p
                                            className={
                                                styles.reviewsItemToTitle
                                            }
                                        >
                                            Отзыв пользователю
                                        </p>

                                        <UserInfoBlock
                                            name={firstName || ""}
                                            surname={lastName || ""}
                                            image={avatarUrl}
                                            isPro={isPro}
                                            id={entityId}
                                        />
                                    </div>
                                }
                            />
                        );
                    })}
                </div>
            ) : (
                <NotContent text="У пользователя еще нет отзывов" />
            )}

            <Pagination
                page={page}
                setPage={setPage}
                totalPages={totalPages || 0}
                isLoading={isLoading}
            />

            {/* <div className={styles.reviewsItemStatus}>
                <p className={styles.reviewsItemStatusTitle}>
                    На модерации
                </p>
            </div>

            <div className={cn(styles.reviewsItemStatus, styles.error)}>
                <p className={styles.reviewsItemStatusTitle}>
                    Отклонен
                </p>

                <p className={styles.reviewsItemStatusText}>
                    В отзыве недостаточно информации о вашем опыте
                    обращения в магазин. Пожалуйста, расскажите
                    подробнее: как вы выбирали товар, как заказывали,
                    обращались ли вы в магазин с вопросами после покупки
                    товара — и насколько его сотрудники были готовы вам
                    помочь. Тогда мы сможем опубликовать ваш отзыв.
                </p>
            </div> */}

            <ConfirmModal
                value={deleteModal}
                setValue={setDeleteModal}
                title="Вы действительно хотите удалить отзыв?"
                callback={deleteReviewHandler}
            />
        </>
    );
};

export default ReviewsMePage;
