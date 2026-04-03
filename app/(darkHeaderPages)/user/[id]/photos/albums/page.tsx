"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import styles from "../index.module.scss";

import { useUserInfo } from "@/features/user";
import { NotContent } from "@/shared/ui/NotContent";
import { Preloader } from "@/shared/ui/Preloader";
import { AlbumItem } from "@/entities/photos/album/ui";
import { Pagination } from "@/shared/ui/Pagination";

const UserByIdAlbums = () => {
    const { id } = useParams();

    const [page, setPage] = React.useState(1);

    const { getUsersAlbumsById } = useUserInfo();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["usersAlbumsById", id, page],
        queryFn: () => getUsersAlbumsById(String(id), page),
        gcTime: 0,
        refetchOnMount: true,
        enabled: !!id,
    });

    const { total, totalPages, data: albums } = data || {};

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
            ) : !!albums?.length ? (
                <div className={styles.photoItems}>
                    {!!albums?.length ? (
                        albums.map((data) => (
                            <AlbumItem key={data.id} data={data} />
                        ))
                    ) : (
                        <NotContent text="Пользователь еще не создал ни одного альбома" />
                    )}
                </div>
            ) : (
                <NotContent text="Пользователь еще не создал ни одного альбома" />
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

export default UserByIdAlbums;
