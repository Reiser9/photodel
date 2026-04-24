"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "./index.module.scss";
import base from "@/shared/styles/base.module.scss";

import {
    Aperture,
    Flash,
    FocalLength,
    Iso,
    Photo,
    Timer,
} from "@/shared/icons";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { Rating } from "@/shared/ui/Rating";
import { Button } from "@/shared/ui/Button";
import { Modal } from "@/shared/ui/Modal";
import { Input } from "@/shared/ui/Input";
import { Comments } from "@/widgets/Comments";
import { SinglePageWrapper } from "@/shared/wrappers/SinglePageWrapper";
import { TextPoint } from "@/shared/ui/TextPoint";
import {
    BackLink,
    MapLocation,
    PhotoInfoBlock,
    Point,
    Points,
} from "@/shared/ui/SinglePage";
import { usePhotos } from "@/features/photos";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { formatDate } from "@/shared/utils/formatDate";
import { useUserInfo } from "@/features/user";
import { useFavorite } from "@/features/favorite";
import { useLike } from "@/features/like";
import useAlert from "@/shared/hooks/useAlert";
import { useReviews } from "@/features/reviews";

const PhotoByIdPage = () => {
    const { id } = useParams();
    const { getPhotoById } = usePhotos();
    const { getShortInfo } = useUserInfo();
    const { addFavorite, removeFavorite } = useFavorite();
    const { addLike, removeLike } = useLike();
    const { alertNotify } = useAlert();
    const { getReviews, createReview } = useReviews();

    const queryClient = useQueryClient();

    const [comment, setComment] = React.useState("");

    const [buyPhotoModal, setBuyPhotoModal] = React.useState(false);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["photoById", String(id)],
        queryFn: () => getPhotoById(String(id)),
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
        queryKey: ["photoCommentsById", String(id)],
        queryFn: () =>
            getReviews({ type: "photo", entity_id: +(id || 0), limit: 100 }),
        enabled: !!String(id),
    });

    const { data: reviews } = reviewsData || {};

    const {
        id: photoId,
        camera,
        aperture,
        flash,
        focalLength,
        isForSale,
        iso,
        location,
        name,
        description,
        imageUrl,
        shutterSpeed,
        createdAt,
        specializations,
        albums,
        user,
        favorites,
        likes,
        reviews: reviewsPhoto,
    } = data || {};

    const { avatarUrl, firstName, isPro, lastName, id: userId } = user || {};
    const { latitude, longitude, place } = location || {};
    const { city } = place || {};
    const { favoriteId, isFavorite, count: favoriteCount } = favorites || {};
    const { count: likesCount, isLiked, likeId } = likes || {};
    const { count: commentsCount } = reviewsPhoto || {};

    const invalidatePhotoData = () => {
        queryClient.invalidateQueries({ queryKey: ["photoById", id] });
    };

    const favoriteHandler = () => {
        if (!photoId) return;

        if (isFavorite) {
            if (!favoriteId) return;

            removeFavorite(favoriteId, invalidatePhotoData);
        } else {
            addFavorite(
                {
                    entityType: "photo",
                    entityId: photoId,
                },
                invalidatePhotoData,
            );
        }
    };

    const likeHandler = () => {
        if (!photoId) return;

        if (isLiked) {
            if (!likeId) return;

            removeLike(likeId, invalidatePhotoData);
        } else {
            addLike(
                {
                    entityType: "photo",
                    entityId: photoId,
                },
                invalidatePhotoData,
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
                entityType: "photo",
                photoIds: [],
            },
            () => {
                setComment("");
                alertNotify("Успешно", "Комментарий оставлен!");
                queryClient.invalidateQueries({
                    queryKey: ["photoCommentsById", String(id)],
                });
                invalidatePhotoData();
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
        return <NotContent text="Фотография не найдена" danger />;
    }

    return (
        <>
            <div className={styles.photoById}>
                <div className={base.container}>
                    <div className={styles.photoByIdInner}>
                        {user && (
                            <div className={styles.photoByIdTop}>
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

                        <BackLink
                            href={`/user/${userId}/photos`}
                            text="Все фотографии"
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
                                                href={`/profile/photos/edit/${id}`}
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
                                            <Point full>
                                                <Photo />
                                                {camera || "Не указана"}
                                            </Point>

                                            {flash && (
                                                <Point full>
                                                    <Flash />
                                                    {flash === "On"
                                                        ? "Использовалась"
                                                        : "Не использовалась"}
                                                </Point>
                                            )}

                                            {aperture && (
                                                <Point>
                                                    <Aperture />
                                                    {aperture}
                                                </Point>
                                            )}

                                            {focalLength && (
                                                <Point>
                                                    <FocalLength />
                                                    {focalLength}
                                                </Point>
                                            )}

                                            {shutterSpeed && (
                                                <Point>
                                                    <Timer />
                                                    {shutterSpeed}
                                                </Point>
                                            )}

                                            {!!iso && (
                                                <Point>
                                                    <Iso />
                                                    {iso}
                                                </Point>
                                            )}
                                        </Points>

                                        {!!specializations?.length && (
                                            <TextPoint
                                                title="Категории:"
                                                text={specializations
                                                    ?.map((data) => data.name)
                                                    .join(", ")}
                                            />
                                        )}

                                        {!!albums?.length && (
                                            <TextPoint
                                                title={`Фото в ${albums.length} альбомах:`}
                                            >
                                                <div
                                                    className={
                                                        styles.photoByIdAlbumsItems
                                                    }
                                                >
                                                    {albums.map((data) => {
                                                        const {
                                                            id,
                                                            imageUrl,
                                                            photosCount,
                                                            title,
                                                        } = data || {};

                                                        return (
                                                            <Link
                                                                key={id}
                                                                href={`/albums/${id}`}
                                                                className={
                                                                    styles.photoByIdAlbumsItem
                                                                }
                                                            >
                                                                <span
                                                                    className={
                                                                        styles.photoByIdAlbumsItemImage
                                                                    }
                                                                >
                                                                    {imageUrl && (
                                                                        <Image
                                                                            src={
                                                                                imageUrl
                                                                            }
                                                                            alt={`Альбом ${title}`}
                                                                            fill
                                                                        />
                                                                    )}
                                                                </span>

                                                                <span
                                                                    className={
                                                                        styles.photoByIdAlbumsItemInfo
                                                                    }
                                                                >
                                                                    <span
                                                                        className={
                                                                            styles.photoByIdAlbumsItemTitle
                                                                        }
                                                                    >
                                                                        {title}
                                                                    </span>
                                                                    <span
                                                                        className={
                                                                            styles.photoByIdAlbumsItemCount
                                                                        }
                                                                    >
                                                                        {
                                                                            photosCount
                                                                        }{" "}
                                                                        фото
                                                                    </span>
                                                                </span>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </TextPoint>
                                        )}

                                        {/* <TextPoint
                                            title="Фото дня:"
                                            text="Становилось 3 раза"
                                        /> */}

                                        {isForSale && (
                                            <Button
                                                onClick={() =>
                                                    setBuyPhotoModal(true)
                                                }
                                            >
                                                Купить фотографию
                                            </Button>
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
                                        image={imageUrl}
                                        title={name || ""}
                                        text={description}
                                    />
                                }
                            />
                        )}
                    </div>
                </div>
            </div>

            {isForSale && (
                <Modal
                    value={buyPhotoModal}
                    setValue={setBuyPhotoModal}
                    title="Купить фотографию"
                    size="small"
                >
                    <div className={styles.buyPhotoModalForm}>
                        <Input title="Имя" full />

                        <Input title="Телефон" full />

                        <Input title="E-mail" full />

                        <Input title="Сообщение" full component="textarea" />

                        <Button>Купить</Button>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default PhotoByIdPage;
