"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "./index.module.scss";
import base from "@/shared/styles/base.module.scss";

import { Case, Money2, Photo } from "@/shared/icons";
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
    PhotoInfoBlock,
    Point,
    Points,
} from "@/shared/ui/SinglePage";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { formatDate } from "@/shared/utils/formatDate";
import { useUserInfo } from "@/features/user";
import { useFavorite } from "@/features/favorite";
import { useLike } from "@/features/like";
import { usePlaces } from "@/features/places";

const PlacePageById = () => {
    const { id } = useParams();
    const { getPlaceById } = usePlaces();
    const { getShortInfo } = useUserInfo();
    const { addFavorite, removeFavorite } = useFavorite();
    const { addLike, removeLike } = useLike();

    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["placeById", String(id)],
        queryFn: () => getPlaceById(String(id)),
    });

    const { data: shortInfo } = useQuery({
        queryKey: ["shortInfo"],
        queryFn: () => getShortInfo(),
    });

    const { id: currentUserId } = shortInfo || {};

    const {
        id: placeId,
        camera,
        location,
        name,
        description,
        createdAt,
        specializations,
        user,
        favorites,
        likes,
        conditions,
        price,
        photos,
    } = data || {};

    const { avatarUrl, firstName, isPro, lastName, id: userId } = user || {};
    const { address, latitude, longitude } = location || {};
    const { favoriteId, isFavorite, count: favoriteCount } = favorites || {};
    const { count: likesCount, isLiked, likeId } = likes || {};

    const invalidatePhotoData = () => {
        queryClient.invalidateQueries({ queryKey: ["placeById", id] });
    };

    const favoriteHandler = () => {
        if (!placeId) return;

        if (isFavorite) {
            if (!favoriteId) return;

            removeFavorite(favoriteId, invalidatePhotoData);
        } else {
            addFavorite(
                {
                    entityType: "place",
                    entityId: placeId,
                },
                invalidatePhotoData,
            );
        }
    };

    const likeHandler = () => {
        if (!placeId) return;

        if (isLiked) {
            if (!likeId) return;

            removeLike(likeId, invalidatePhotoData);
        } else {
            addLike(
                {
                    entityType: "place",
                    entityId: placeId,
                },
                invalidatePhotoData,
            );
        }
    };

    if (isLoading) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent text="Произошла ошибка при загрузе данных" danger />;
    }

    if (!data) {
        return <NotContent text="Место для съемки не найдено" danger />;
    }

    return (
        <div className={styles.placeById}>
            <div className={base.container}>
                <div className={styles.placeByIdInner}>
                    {user && (
                        <div className={styles.placeByIdTop}>
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
                        href={`/user/${userId}/places`}
                        text="Все места для съемок"
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
                                <>
                                    <Comments
                                        comments={[
                                            {
                                                comment: "Тест",
                                                id: 1,
                                                image: "/img/people2.png",
                                                name: "Сара",
                                                surname: "Балтимор",
                                                status: "Сегодня 20:10",
                                                isPro: true,
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="Ваш комментарий"
                                            component="textarea"
                                            full
                                        />

                                        <Button auto disabled>
                                            Комментарировать
                                        </Button>
                                    </Comments>
                                </>
                            }
                            sidebar={
                                <>
                                    {currentUserId === userId && (
                                        <Button
                                            href={`/profile/places/edit/${id}`}
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

                                    <Points>
                                        <Point full>
                                            <Photo />
                                            {camera || "Не указана"}
                                        </Point>

                                        {price && (
                                            <Point full>
                                                <Money2 />
                                                {price}
                                            </Point>
                                        )}

                                        {conditions && (
                                            <Point full>
                                                <Case />
                                                {conditions}
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
                                    comments={23}
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

export default PlacePageById;
