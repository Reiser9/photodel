"use client";

import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "../index.module.scss";

import type { Photosession } from "@/entities/photosessions";
import { useFavorite } from "@/features/favorite";
import { Pagination } from "@/shared/ui/Pagination";
import { ProfileActionsBlock } from "@/shared/ui/PhotosBlock";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { ConfirmModal } from "@/shared/ui/Modal";
import { Checkbox } from "@/shared/ui/Checkbox";
import { PhotosessionItem } from "@/entities/photosessions/ui";

const FavoritePhotosessions = () => {
    const [page, setPage] = React.useState(1);
    const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
    const [action, setAction] = React.useState<string | null>(null);

    const [confirmDeleteModal, setConfirmDeleteModal] = React.useState(false);

    const { getFavorites, deleteBulkFavorites } = useFavorite();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["myFavorites", "photo_session"],
        queryFn: () => getFavorites("photo_session"),
    });

    const { total, data: photosessions, totalPages } = data || {};

    const selectPhoto = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds((prev) => prev.filter((item) => item != id));
        } else {
            setSelectedIds((prev) => [...prev, id]);
        }
    };

    const deleteCheckedFavoritesPhotos = () => {
        deleteBulkFavorites({ ids: selectedIds }, () => {
            queryClient.invalidateQueries({ queryKey: ["myFavorites", "photo_session"] });
            setSelectedIds([]);
            setAction(null);
        });
    };

    const isAllSelected = React.useMemo(() => {
        if (!photosessions || photosessions.length === 0) return false;

        return photosessions.every((item) =>
            selectedIds.includes(item.favorites.favoriteId || 0),
        );
    }, [photosessions, selectedIds]);

    const selectAllEntities = () => {
        if (isAllSelected) {
            setSelectedIds([]);
        } else {
            if (!photosessions) return;

            const allIds = photosessions.map((item) => item.favorites.favoriteId || 0);
            setSelectedIds(allIds);
        }
    };

    React.useEffect(() => {
        if (action) {
            if (!selectedIds.length) {
                alert(
                    "Для применения действия требуется выбрать хотя бы 1 элемент",
                );
                return setAction(null);
            }

            if (action === "delete") {
                setConfirmDeleteModal(true);
            }
        }
    }, [action]);

    return (
        <>
            <ProfileActionsBlock
                count={total}
                elems={photosessions || []}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                action={action}
                setAction={setAction}
                actionOptions={[
                    {
                        label: "Удалить",
                        value: "delete",
                    },
                ]}
                checkboxContent={
                    <Checkbox
                        label="Выбрать все"
                        id="photosessions_checkbox"
                        auto
                        value={isAllSelected}
                        onChangeHandler={selectAllEntities}
                    />
                }
            >
                {isLoading ? (
                    <Preloader page small />
                ) : isError ? (
                    <NotContent
                        text="Произошла ошибка при загрузке данных"
                        danger
                    />
                ) : total && total > 0 ? (
                    <div className={styles.photoProfileItems}>
                        {(photosessions || []).map((data) => (
                            <PhotosessionItem
                                key={data.id}
                                data={data as Photosession}
                                mode="select"
                                clickOnPhoto={() =>
                                    selectPhoto(data.favorites.favoriteId || 0)
                                }
                                checkboxValue={selectedIds.includes(
                                    data.favorites.favoriteId || 0,
                                )}
                            />
                        ))}
                    </div>
                ) : (
                    <NotContent text="Вы не добавили ни одной фотосессии в избранное" />
                )}
            </ProfileActionsBlock>

            <Pagination
                page={page}
                totalPages={totalPages || 0}
                setPage={setPage}
                isLoading={isLoading}
            />

            <ConfirmModal
                value={confirmDeleteModal}
                setValue={setConfirmDeleteModal}
                title={`Вы действительно хотите удалить ${selectedIds.length} фото из избранного?`}
                callback={deleteCheckedFavoritesPhotos}
                rejectCallback={() => setAction(null)}
            />
        </>
    );
};

export default FavoritePhotosessions;
