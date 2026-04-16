"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "./index.module.scss";
import base from "@/shared/styles/base.module.scss";

import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { Rating } from "@/shared/ui/Rating";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Comments } from "@/widgets/Comments";
import { SinglePageWrapper } from "@/shared/wrappers/SinglePageWrapper";
import { TextPoint } from "@/shared/ui/TextPoint";
import {
    BackLink,
    MapLocation,
    PeopleItem,
    Peoples,
    PhotoInfoBlock,
} from "@/shared/ui/SinglePage";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { formatDate } from "@/shared/utils/formatDate";
import { useUserInfo } from "@/features/user";
import { useFavorite } from "@/features/favorite";
import { useLike } from "@/features/like";
import { usePhotosessions } from "@/features/photosessions";
import { useReviews } from "@/features/reviews";
import useAlert from "@/shared/hooks/useAlert";

const PhotosessionsById = () => {
    const { id } = useParams();
    const { getPhotosessionById } = usePhotosessions();
    const { getShortInfo } = useUserInfo();
    const { addFavorite, removeFavorite } = useFavorite();
    const { addLike, removeLike } = useLike();
    const { alertNotify } = useAlert();
    const { getReviews, createReview } = useReviews();

    const queryClient = useQueryClient();

    const [comment, setComment] = React.useState("");

    const { data, isLoading, isError } = useQuery({
        queryKey: ["photosessionById", String(id)],
        queryFn: () => getPhotosessionById(String(id)),
    });

    const { data: shortInfo } = useQuery({
        queryKey: ["shortInfo"],
        queryFn: () => getShortInfo(),
    });

    const { id: currentUserId } = shortInfo || {};

    const {
        data: reviewsData,
        isLoading: reviewsIsLoading,
        isError: reviewsIsError,
    } = useQuery({
        queryKey: ["photosessionCommentsById", String(id)],
        queryFn: () =>
            getReviews({
                type: "photo_session",
                entity_id: +(id || 0),
                limit: 100,
            }),
        enabled: !!String(id),
    });

    const { data: reviews } = reviewsData || {};

    const {
        id: photosessionId,
        location,
        name,
        description,
        createdAt,
        user,
        favorites,
        likes,
        photos,
        startDate,
        team,
        specialization,
        reviews: reviewsPlace,
    } = data || {};

    const { avatarUrl, firstName, isPro, lastName, id: userId } = user || {};
    const { address, latitude, longitude } = location || {};
    const { favoriteId, isFavorite, count: favoriteCount } = favorites || {};
    const { count: likesCount, isLiked, likeId } = likes || {};
    const { count: commentsCount } = reviewsPlace || {};

    const invalidatePhotosessionData = () => {
        queryClient.invalidateQueries({ queryKey: ["photosessionById", id] });
    };

    const favoriteHandler = () => {
        if (!photosessionId) return;

        if (isFavorite) {
            if (!favoriteId) return;

            removeFavorite(favoriteId, invalidatePhotosessionData);
        } else {
            addFavorite(
                {
                    entityType: "photo_session",
                    entityId: photosessionId,
                },
                invalidatePhotosessionData,
            );
        }
    };

    const likeHandler = () => {
        if (!photosessionId) return;

        if (isLiked) {
            if (!likeId) return;

            removeLike(likeId, invalidatePhotosessionData);
        } else {
            addLike(
                {
                    entityType: "photo_session",
                    entityId: photosessionId,
                },
                invalidatePhotosessionData,
            );
        }
    };

    const leaveCommentHandler = () => {
        if (!comment.trim()) {
            return alertNotify(
                "Внимание",
                "Поле комментария должно быть заполнено",
                "warn",
            );
        }

        createReview(
            {
                content: comment,
                entityId: +String(id),
                entityType: "photo_session",
                photoIds: [],
            },
            () => {
                setComment("");
                alertNotify("Успешно", "Комментарий оставлен!");
                queryClient.invalidateQueries({
                    queryKey: ["photosessionCommentsById", String(id)],
                });
                invalidatePhotosessionData();
            },
        );
    };

    if (isLoading) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent text="Произошла ошибка при загрузе данных" danger />;
    }

    if (!data) {
        return <NotContent text="Фотосессия не найдена" danger />;
    }

    return (
        <div className={styles.photosessionById}>
            <div className={base.container}>
                <div className={styles.photosessionByIdInner}>
                    {user && (
                        <div className={styles.photosessionByIdTop}>
                            <UserInfoBlock
                                image={avatarUrl}
                                name={firstName || ""}
                                surname={lastName || ""}
                                id={userId}
                                isPro={isPro}
                                size="medium"
                            />

                            <Rating rating="4.92" />
                        </div>
                    )}

                    <BackLink
                        href={`/user/${userId}/photosessions`}
                        text="Все фотосессии"
                    />

                    {isLoading ? (
                        <Preloader page small />
                    ) : isError ? (
                        <NotContent
                            text="Произошла ошибка при получении данных"
                            danger
                        />
                    ) : (
                        <SinglePageWrapper
                            content={
                                <Comments
                                    commentsIsLoading={reviewsIsLoading}
                                    commentsIsError={reviewsIsError}
                                    comments={reviews || []}
                                >
                                    <Input
                                        placeholder="Ваш комментарий"
                                        component="textarea"
                                        full
                                        value={comment}
                                        setValue={setComment}
                                    />

                                    <Button
                                        auto
                                        disabled={!comment}
                                        onClick={leaveCommentHandler}
                                    >
                                        Комментарировать
                                    </Button>
                                </Comments>
                            }
                            sidebar={
                                <>
                                    {currentUserId === userId && (
                                        <Button
                                            href={`/profile/photosessions/edit/${id}`}
                                        >
                                            Редактировать
                                        </Button>
                                    )}

                                    {address && (
                                        <MapLocation
                                            location={address || ""}
                                            distance=""
                                            coords={
                                                longitude && latitude
                                                    ? [latitude, longitude]
                                                    : undefined
                                            }
                                        />
                                    )}

                                    {startDate && (
                                        <TextPoint
                                            title="Дата проведения:"
                                            text={formatDate(
                                                startDate.toString(),
                                            )}
                                        />
                                    )}

                                    {specialization && (
                                        <TextPoint
                                            title="Тип съемки:"
                                            text={specialization.name}
                                        />
                                    )}

                                    {!!team?.length && (
                                        <Peoples title="Команда">
                                            {team.map((data) => {
                                                const {
                                                    id,
                                                    avatarUrl,
                                                    firstName,
                                                    isPro,
                                                    lastName,
                                                } = data || {};
                                                return (
                                                    <PeopleItem
                                                        key={id}
                                                        id={id}
                                                        image={avatarUrl}
                                                        name={firstName}
                                                        surname={lastName}
                                                        role="Фотограф"
                                                        isPro={isPro}
                                                    />
                                                );
                                            })}
                                        </Peoples>
                                    )}

                                    {currentUserId !== userId && (
                                        <Button>Запрос на съемку</Button>
                                    )}
                                </>
                            }
                            infoBlock={
                                <PhotoInfoBlock
                                    date={
                                        createdAt
                                            ? formatDate(
                                                  createdAt,
                                                  "DD MMMM YYYY",
                                              )
                                            : ""
                                    }
                                    comments={commentsCount || 0}
                                    favorites={favoriteCount || 0}
                                    isFavorite={isFavorite}
                                    favoriteCallback={favoriteHandler}
                                    likes={likesCount || 0}
                                    isLike={isLiked}
                                    likeCallback={likeHandler}
                                    views={23}
                                    isCarousel
                                    slides={photos || []}
                                    title={name || ""}
                                    text={description}
                                />
                            }
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PhotosessionsById;
