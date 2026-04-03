"use client";

import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "./index.module.scss";

import { ProfileActionsBlock } from "@/shared/ui/PhotosBlock";
import { usePhotos } from "@/features/photos";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { ConfirmModal } from "@/shared/ui/Modal";
import { PhotoItem } from "@/entities/photos/photo/ui";
import { Pagination } from "@/shared/ui/Pagination";

const ProfilePhotoPage = () => {
    const [page, setPage] = React.useState(1);
    const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
    const [action, setAction] = React.useState<string | null>(null);

    const [confirmDeleteModal, setConfirmDeleteModal] = React.useState(false);

    const { getMyPhotos, deleteBulkPhotos } = usePhotos();

    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["myPhotos", page],
        queryFn: () =>
            getMyPhotos({
                page,
            }),
    });

    const { data: photos, total, totalPages } = data || {};

    const selectPhoto = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds((prev) => prev.filter((item) => item != id));
        } else {
            setSelectedIds((prev) => [...prev, id]);
        }
    };

    const deleteCheckedPhotos = () => {
        deleteBulkPhotos({ ids: selectedIds }, () => {
            queryClient.invalidateQueries({ queryKey: ["myPhotos"] });
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
                elems={photos || []}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                action={action}
                setAction={setAction}
                linkValue="/profile/photos/add"
                linkText="Добавить фото"
                checkboxId="photos_checkbox"
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
                        {(photos || []).map((data) => (
                            <PhotoItem
                                key={data.id}
                                data={data}
                                mode="edit"
                                clickOnPhoto={() => selectPhoto(data.id)}
                                checkboxValue={selectedIds.includes(data.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <NotContent text="Фотографий еще нет" />
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
                title={`Вы действительно хотите удалить ${selectedIds.length} фото?`}
                callback={deleteCheckedPhotos}
                rejectCallback={() => setAction(null)}
            />
        </>
    );
};

export default ProfilePhotoPage;
