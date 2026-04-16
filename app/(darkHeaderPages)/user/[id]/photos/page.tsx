"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import styles from "./index.module.scss";

import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { Pagination } from "@/shared/ui/Pagination";
import { usePhotos } from "@/features/photos";

const UserByIdPhotos = () => {
    const { id } = useParams();

    const [page, setPage] = React.useState(1);

    const { getPhotos } = usePhotos();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["usersPhotoById", id, page],
        queryFn: () =>
            getPhotos({
                page,
                user_id: String(id),
            }),
        enabled: !!id,
    });

    const { total, totalPages, data: photos } = data || {};

    return (
        <>
            <div className={styles.photoTop}>
                <p className={styles.photoTopCount}>
                    Всего: <span>{total || 0}</span>
                </p>
            </div>

            {isLoading ? (
                <Preloader page small />
            ) : isError ? (
                <NotContent
                    text="Произошла ошибка при загрузке данных"
                    danger
                />
            ) : !!photos?.length ? (
                <div className={styles.photoItems}>
                    {photos.map((data, id) => (
                        <Link
                            key={id}
                            href={`/photos/${data.id}`}
                            className={styles.photoItem}
                        >
                            <Image
                                src={data.imageUrl}
                                alt={`Фотография ${data.name}`}
                                fill
                            />
                        </Link>
                    ))}
                </div>
            ) : (
                <NotContent text="Пользователь еще не загрузил ни одной фотографии" />
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

export default UserByIdPhotos;
