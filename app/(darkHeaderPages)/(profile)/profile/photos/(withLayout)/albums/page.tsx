"use client";

import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "../index.module.scss";

import { useAlbums } from "@/features/photos";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { ProfileActionsBlock } from "@/shared/ui/PhotosBlock";
import { ConfirmModal } from "@/shared/ui/Modal";
import { AlbumItem } from "@/entities/photos/album/ui";
import { Pagination } from "@/shared/ui/Pagination";

const ProfileAlbumsPage = () => {
    const [page, setPage] = React.useState(1);
    const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
    const [action, setAction] = React.useState<string | null>(null);

    const [confirmDeleteModal, setConfirmDeleteModal] = React.useState(false);

    const { getMyAlbums, deleteBuldAlbums } = useAlbums();

    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["myAlbums", page],
        queryFn: () => getMyAlbums(page),
    });

    const { data: albums, total, totalPages } = data || {};

    const selectAlbum = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds((prev) => prev.filter((item) => item != id));
        } else {
            setSelectedIds((prev) => [...prev, id]);
        }
    };

    const deleteCheckedAlbums = () => {
        deleteBuldAlbums({ ids: selectedIds }, () => {
            queryClient.invalidateQueries({ queryKey: ["myAlbums"] });
            setSelectedIds([]);
            setAction(null);
        });
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
                return setConfirmDeleteModal(true);
            }
        }
    }, [action]);

    return (
        <>
            <ProfileActionsBlock
                count={total}
                elems={albums || []}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                action={action}
                setAction={setAction}
                linkValue="/profile/albums/add"
                linkText="Добавить альбом"
                checkboxId="albums_checkbox"
                actionOptions={[
                    {
                        label: "Удалить",
                        value: "delete",
                    },
                ]}
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
                        {(albums || []).map((data) => (
                            <AlbumItem
                                key={data.id}
                                data={data}
                                mode="edit"
                                clickOnPhoto={() => selectAlbum(data.id)}
                                checkboxValue={selectedIds.includes(data.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <NotContent text="Альбомов еще нет" />
                )}
            </ProfileActionsBlock>

            <Pagination
                page={page}
                setPage={setPage}
                totalPages={totalPages || 0}
                isLoading={isLoading}
            />

            <ConfirmModal
                value={confirmDeleteModal}
                setValue={setConfirmDeleteModal}
                title={`Вы действительно хотите удалить ${selectedIds.length} альбомов?`}
                callback={deleteCheckedAlbums}
                rejectCallback={() => setAction(null)}
            />
        </>
    );
};

export default ProfileAlbumsPage;
