"use client";

import React from "react";
import cn from "classnames";
import { useQuery } from "@tanstack/react-query";

import styles from "./index.module.scss";

import { PhotosBlock } from "@/shared/ui/PhotosBlock";
import { usePhotos } from "@/features/photos";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";

const ProfilePhotoPage = () => {
    const [page, setPage] = React.useState(1);

    const { getMyPhotos } = usePhotos();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["myPhotos", page],
        queryFn: () => getMyPhotos(page),
    });

    const { data: photos, isLast, total, totalPages } = data || {};

    return (
        <>
            {isLoading ? (
                <Preloader page small />
            ) : isError ? (
                <NotContent text="Произошла ошибка при загрузке данных" />
            ) : total && total > 0 ? (
                <PhotosBlock count={total} photos={photos || []} />
            ) : (
                <NotContent text="Фотографий еще нет" />
            )}

            {!!totalPages && totalPages > 1 && (
                <div className={styles.pagination}>
                    {[...Array(totalPages)].map((_, id) => (
                        <button
                            key={id}
                            className={cn(styles.paginationButton, {
                                [styles.active]: id + 1 === page,
                            })}
                            onClick={() => setPage(id + 1)}
                        >
                            {id + 1}
                        </button>
                    ))}
                </div>
            )}
        </>
    );
};

export default ProfilePhotoPage;
