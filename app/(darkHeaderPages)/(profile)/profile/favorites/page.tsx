"use client";

import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "./index.module.scss";

import type { UserByIdShortInfo } from "@/entities/user";
import { useFavorite } from "@/features/favorite";
import { Pagination } from "@/shared/ui/Pagination";
import { ConfirmModal } from "@/shared/ui/Modal";
import { NotContent } from "@/shared/ui/NotContent";
import { ProfileActionsBlock } from "@/shared/ui/PhotosBlock";
import { Preloader } from "@/shared/ui/Preloader";
import { UserItem } from "@/entities/user/ui";
import { Checkbox } from "@/shared/ui/Checkbox";

const FavoritesPage = () => {
    const [page, setPage] = React.useState(1);
    const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
    const [action, setAction] = React.useState<string | null>(null);

    const [confirmDeleteModal, setConfirmDeleteModal] = React.useState(false);

    const { getFavorites, deleteBulkFavorites } = useFavorite();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["myFavorites", "user"],
        queryFn: () => getFavorites("user"),
    });

    const { data: users, totalPages, total } = data || {};

    const selectUser = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds((prev) => prev.filter((item) => item != id));
        } else {
            setSelectedIds((prev) => [...prev, id]);
        }
    };

    const deleteCheckedFavoritesUsers = () => {
        deleteBulkFavorites({ ids: selectedIds }, () => {
            queryClient.invalidateQueries({ queryKey: ["myFavorites", "user"] });
            setSelectedIds([]);
            setAction(null);
        });
    };

    const isAllSelected = React.useMemo(() => {
        if (!users || users.length === 0) return false;

        return users.every((item) =>
            selectedIds.includes(item.favorites.favoriteId || 0),
        );
    }, [users, selectedIds]);

    const selectAllEntities = () => {
        if (isAllSelected) {
            setSelectedIds([]);
        } else {
            if (!users) return;

            const allIds = users.map((item) => item.favorites.favoriteId || 0);
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
                elems={users || []}
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
                        id="users_checkbox"
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
                        {(users || []).map((data) => (
                            <UserItem
                                key={data.id}
                                data={data as UserByIdShortInfo}
                                checkboxValue={selectedIds.includes(
                                    data.favorites.favoriteId || 0,
                                )}
                                clickOnUser={() =>
                                    selectUser(data.favorites.favoriteId || 0)
                                }
                            />
                        ))}
                    </div>
                ) : (
                    <NotContent text="Вы не добавили ни одного профиля в избранное" />
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
                title={`Вы действительно хотите удалить ${selectedIds.length} пользователя из избранного?`}
                callback={deleteCheckedFavoritesUsers}
                rejectCallback={() => setAction(null)}
            />
        </>
    );
};

export default FavoritesPage;
