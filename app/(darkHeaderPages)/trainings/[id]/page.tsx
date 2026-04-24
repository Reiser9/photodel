"use client";

import { useParams } from "next/navigation";

import styles from "../index.module.scss";
import base from "@/shared/styles/base.module.scss";

import { Case, Date, Format, Money, Photo } from "@/shared/icons";
import { Rating } from "@/shared/ui/Rating";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { SinglePageWrapper } from "@/shared/wrappers/SinglePageWrapper";
import { Comments } from "@/widgets/Comments";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { TextPoint } from "@/shared/ui/TextPoint";
import {
    BackLink,
    MapLocation,
    PeopleItem,
    Peoples,
    PhotoInfoBlock,
    Point,
    Points,
} from "@/shared/ui/SinglePage";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useReviews } from "@/features/reviews";
import useAlert from "@/shared/hooks/useAlert";
import { useLike } from "@/features/like";
import { useFavorite } from "@/features/favorite";
import { useUserInfo } from "@/features/user";
import { useTrainings } from "@/features/trainings";
import { formatDate } from "@/shared/utils/formatDate";
import dayjs from "dayjs";

const ProfileTrainingById = () => {
    const { id } = useParams();
    const { getTrainingById } = useTrainings();
    const { getShortInfo } = useUserInfo();
    const { addFavorite, removeFavorite } = useFavorite();
    const { addLike, removeLike } = useLike();
    const { alertNotify } = useAlert();
    const { getReviews, createReview } = useReviews();

    const queryClient = useQueryClient();

    const [comment, setComment] = React.useState("");

    const { data, isLoading, isError } = useQuery({
        queryKey: ["trainingById", String(id)],
        queryFn: () => getTrainingById(String(id)),
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
        queryKey: ["trainingCommentsById", String(id)],
        queryFn: () =>
            getReviews({
                type: "training",
                entity_id: +(id || 0),
                limit: 100,
            }),
        enabled: !!String(id),
    });

    const { data: reviews } = reviewsData || {};

    const {
        id: trainingId,
        location,
        name,
        description,
        createdAt,
        user,
        favorites,
        likes,
        photos,
        startDate,
        endDate,
        team,
        format,
        price,
        organizers,
        maxParticipants,
        prepayment,
        reviews: reviewsPlace,
    } = data || {};

    const { avatarUrl, firstName, isPro, lastName, id: userId } = user || {};
    const { latitude, longitude, place } = location || {};
    const { city } = place || {};
    const { favoriteId, isFavorite, count: favoriteCount } = favorites || {};
    const { count: likesCount, isLiked, likeId } = likes || {};
    const { count: commentsCount } = reviewsPlace || {};

    const invalidatePhotosessionData = () => {
        queryClient.invalidateQueries({ queryKey: ["trainingById", id] });
    };

    const favoriteHandler = () => {
        if (!trainingId) return;

        if (isFavorite) {
            if (!favoriteId) return;

            removeFavorite(favoriteId, invalidatePhotosessionData);
        } else {
            addFavorite(
                {
                    entityType: "training",
                    entityId: trainingId,
                },
                invalidatePhotosessionData,
            );
        }
    };

    const likeHandler = () => {
        if (!trainingId) return;

        if (isLiked) {
            if (!likeId) return;

            removeLike(likeId, invalidatePhotosessionData);
        } else {
            addLike(
                {
                    entityType: "training",
                    entityId: trainingId,
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
                entityType: "training",
                photoIds: [],
            },
            () => {
                setComment("");
                alertNotify("Успешно", "Комментарий оставлен!");
                queryClient.invalidateQueries({
                    queryKey: ["trainingCommentsById", String(id)],
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
        return <NotContent text="Обучение не найдено" danger />;
    }

    return (
        <div className={styles.trainingById}>
            <div className={base.container}>
                <div className={styles.trainingByIdInner}>
                    {user && (
                        <div className={styles.trainingByIdTop}>
                            <UserInfoBlock
                                image={avatarUrl}
                                name={firstName || ""}
                                surname={lastName || ""}
                                id={userId}
                                isPro={isPro}
                                size="medium"
                            />

                            {/* <Rating rating="4.92" /> */}
                        </div>
                    )}

                    <BackLink href="/profile/trainings" text="Все обучения" />

                    <SinglePageWrapper
                        content={
                            <>
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
                            </>
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

                                {city && (
                                    <MapLocation
                                        location={city || ""}
                                        distance=""
                                        coords={
                                            longitude && latitude
                                                ? [latitude, longitude]
                                                : undefined
                                        }
                                    />
                                )}

                                <Points>
                                    {format && (
                                        <Point full>
                                            <Format />
                                            {format}
                                        </Point>
                                    )}

                                    <Point full>
                                        <Date />
                                        {formatDate(
                                            startDate,
                                            "DD MMMM",
                                        )} - {formatDate(endDate, "DD MMMM")}
                                    </Point>

                                    {price && (
                                        <Point full>
                                            <Money />
                                            {price}
                                        </Point>
                                    )}
                                </Points>

                                {prepayment && (
                                    <TextPoint
                                        title="Предоплата:"
                                        text={prepayment}
                                    />
                                )}

                                <p className={styles.trainingPlacesLeft}>
                                    6 из {maxParticipants} мест свободно
                                </p>

                                <Button>Записаться</Button>

                                {!!organizers && !!organizers?.length && (
                                    <Peoples title="Организаторы">
                                        {organizers.map((data) => {
                                            const {
                                                avatarUrl,
                                                id,
                                                lastName,
                                                isPro,
                                                firstName,
                                            } = data || {};

                                            return (
                                                <PeopleItem
                                                    key={id}
                                                    id={id}
                                                    image={avatarUrl}
                                                    name={firstName}
                                                    surname={lastName}
                                                    isPro={isPro}
                                                />
                                            );
                                        })}
                                    </Peoples>
                                )}

                                {!!team && !!team?.length && (
                                    <Peoples title="Команда">
                                        {team.map((data) => {
                                            const {
                                                avatarUrl,
                                                id,
                                                lastName,
                                                isPro,
                                                firstName,
                                            } = data || {};

                                            return (
                                                <PeopleItem
                                                    key={id}
                                                    id={id}
                                                    image={avatarUrl}
                                                    name={firstName}
                                                    surname={lastName}
                                                    isPro={isPro}
                                                />
                                            );
                                        })}
                                    </Peoples>
                                )}

                                {/* <Peoples title="Участники">
                                    <PeopleItem
                                        id="1"
                                        image="/img/people3.png"
                                        name="Альберт"
                                        surname="Кокшаров"
                                        isPro
                                    />
                                </Peoples> */}
                            </>
                        }
                        infoBlock={
                            <PhotoInfoBlock
                                date={
                                    createdAt
                                        ? formatDate(createdAt, "DD MMMM YYYY")
                                        : ""
                                }
                                comments={commentsCount || 0}
                                favorites={favoriteCount || 0}
                                isFavorite={isFavorite}
                                favoriteCallback={favoriteHandler}
                                likes={likesCount || 0}
                                isLike={isLiked}
                                likeCallback={likeHandler}
                                isCarousel
                                slides={photos || []}
                                title={name || ""}
                                text={description}
                            />
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfileTrainingById;
