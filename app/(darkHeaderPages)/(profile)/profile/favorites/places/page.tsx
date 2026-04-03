"use client";

import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "../index.module.scss";

import type { Place } from "@/entities/places";
import { useFavorite } from "@/features/favorite";
import { Pagination } from "@/shared/ui/Pagination";
import { ProfileActionsBlock } from "@/shared/ui/PhotosBlock";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { ConfirmModal } from "@/shared/ui/Modal";
import { Checkbox } from "@/shared/ui/Checkbox";
import { PlaceItem } from "@/entities/places/ui";

const FavoritePlaces = () => {
    const [page, setPage] = React.useState(1);
    const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
    const [action, setAction] = React.useState<string | null>(null);

    const [confirmDeleteModal, setConfirmDeleteModal] = React.useState(false);

    const { getFavorites, deleteBulkFavorites } = useFavorite();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["myFavorites", "place"],
        queryFn: () => getFavorites("place"),
    });

    const { total, data: photos, totalPages } = data || {};

    const selectPhoto = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds((prev) => prev.filter((item) => item != id));
        } else {
            setSelectedIds((prev) => [...prev, id]);
        }
    };

    const deleteCheckedFavoritesPhotos = () => {
        deleteBulkFavorites({ ids: selectedIds }, () => {
            queryClient.invalidateQueries({
                queryKey: ["myFavorites", "place"],
            });
            setSelectedIds([]);
            setAction(null);
        });
    };

    const isAllSelected = React.useMemo(() => {
        if (!photos || photos.length === 0) return false;

        return photos.every((item) =>
            selectedIds.includes(item.favorites.favoriteId || 0),
        );
    }, [photos, selectedIds]);

    const selectAllEntities = () => {
        if (isAllSelected) {
            setSelectedIds([]);
        } else {
            if (!photos) return;

            const allIds = photos.map((item) => item.favorites.favoriteId || 0);
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
                elems={photos || []}
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
                        id="places_checkbox"
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
                    <div className={styles.placeProfileItems}>
                        {(photos || []).map((data) => (
                            <PlaceItem
                                key={data.id}
                                data={data as Place}
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
                    <NotContent text="Вы не добавили ни одного места для съемки в избранное" />
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
                title={`Вы действительно хотите удалить ${selectedIds.length} мест для съемки из избранного?`}
                callback={deleteCheckedFavoritesPhotos}
                rejectCallback={() => setAction(null)}
            />
        </>
    );
};

export default FavoritePlaces;
