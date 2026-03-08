"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { useQuery } from "@tanstack/react-query";

import styles from "../index.module.scss";

import { useAlbums } from "@/features/photos";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { CirclePlus } from "@/shared/icons";
import { Select } from "@/shared/ui/Select";
import { Checkbox } from "@/shared/ui/Checkbox";

const ProfileAlbumsPage = () => {
    const [page, setPage] = React.useState(1);

    const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
    const [action, setAction] = React.useState<"delete" | null>(null);

    const { getMyAlbums } = useAlbums();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["myPhotos", page],
        queryFn: () => getMyAlbums(page),
    });

    const { data: albums, isLast, total, totalPages } = data || {};

    const selectAlbum = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds((prev) => prev.filter((item) => item != id));
        } else {
            setSelectedIds((prev) => [...prev, id]);
        }
    };

    const isAllSelected = React.useMemo(() => {
        if (!albums || albums.length === 0) return false;

        return albums.every((photo) => selectedIds.includes(photo.id));
    }, [albums, selectedIds]);

    const selectAllAlbums = () => {
        if (isAllSelected) {
            setSelectedIds([]);
        } else {
            const allIds = (albums || []).map((photo) => photo.id);
            setSelectedIds(allIds);
        }
    };

    return (
        <>
            {isLoading ? (
                <Preloader page small />
            ) : isError ? (
                <NotContent text="Произошла ошибка при загрузке данных" />
            ) : total && total > 0 ? (
                <>
                    <div className={styles.photoTop}>
                        <div className={styles.photoTopWrap}>
                            <p className={styles.photoTopCount}>
                                Всего: <span>{total}</span>
                            </p>

                            <Checkbox
                                label="Выбрать все"
                                id="photos_all"
                                auto
                                value={isAllSelected}
                                onChangeHandler={selectAllAlbums}
                            />
                        </div>

                        <div className={styles.photoTopWrap}>
                            <Link
                                href="/profile/albums/add"
                                className={styles.addLink}
                            >
                                <CirclePlus />
                                Добавить альбом
                            </Link>

                            <Select
                                wrapperClass={styles.actionSelect}
                                placeholder="Выберите действие"
                                value={action}
                                setValue={setAction}
                                options={[
                                    {
                                        label: "Удалить",
                                        value: "delete",
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    <div className={styles.albumItems}>
                        {(albums || []).map((data) => {
                            const { id, title, image } = data || {};

                            return (
                                <Link
                                    key={id}
                                    href={`/profile/albums/${id}`}
                                    className={styles.albumItem}
                                >
                                    <span className={styles.albumItemImage}>
                                        {image && (
                                            <Image
                                                src={image}
                                                alt={`Фото альбома ${title}`}
                                                fill
                                            />
                                        )}
                                    </span>

                                    <span className={styles.albumItemInfo}>
                                        <span
                                            className={
                                                styles.albumItemInfoTitle
                                            }
                                        >
                                            {title}
                                        </span>

                                        <span
                                            className={
                                                styles.albumItemInfoCount
                                            }
                                        >
                                            5 фото
                                        </span>
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </>
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

export default ProfileAlbumsPage;
