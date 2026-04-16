"use client";

import React from "react";
import parse from "html-react-parser";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import styles from "./index.module.scss";
import base from "@/shared/styles/base.module.scss";

import { BackLink } from "@/shared/ui/BackLink";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { Rating } from "@/shared/ui/Rating";
import { useAlbums, usePhotos } from "@/features/photos";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { PhotoItem } from "@/entities/photos/photo/ui";

const AlbumById = () => {
    const { id } = useParams();
    const [page, setPage] = React.useState(1);

    const { getAlbumById } = useAlbums();
    const { getPhotos } = usePhotos();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["albumById", String(id)],
        queryFn: () => getAlbumById(String(id)),
        enabled: !!id,
    });

    const { title, description } = data || {};

    const {
        data: photosData,
        isLoading: photosIsLoading,
        isError: photosIsError,
    } = useQuery({
        queryKey: ["photos", page, String(id)],
        queryFn: () =>
            getPhotos({
                page,
                album_id: String(id),
            }),
        enabled: !!id,
    });

    const { data: photos, total } = photosData || {};

    if (isLoading) {
        return <Preloader page />;
    }

    if (isError) {
        return (
            <NotContent text="Произошла ошибка при загрузке данных" danger />
        );
    }

    return (
        <div className={styles.albumById}>
            <div className={base.container}>
                <div className={styles.albumByIdInner}>
                    {/* {user && (
                        <div className={styles.photoByIdTop}>
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
                        href={`/user/${userId}/albums`}
                        text="Все альбомы"
                    /> */}

                    <div className={styles.albumByIdInfo}>
                        <p className={styles.albumByIdInfoTitle}>{title}</p>

                        {description && (
                            <div className={styles.albumByIdInfoText}>
                                {parse(description)}
                            </div>
                        )}
                    </div>

                    <div className={styles.albumByIdContent}>
                        <p className={styles.albumByIdContentCount}>
                            Всего: <span>{total}</span>
                        </p>

                        {photosIsLoading ? (
                            <Preloader small page />
                        ) : photosIsError ? (
                            <NotContent
                                text="Произошла ошибка при загрузке данных"
                                danger
                            />
                        ) : !!photos?.length ? (
                            <div className={styles.albumByIdItems}>
                                {photos.map((data) => (
                                    <PhotoItem key={data.id} data={data} />
                                ))}
                            </div>
                        ) : (
                            <NotContent text="В альбоме нет фотографий" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlbumById;
