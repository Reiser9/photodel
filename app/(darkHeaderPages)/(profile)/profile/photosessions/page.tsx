"use client";

import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "./index.module.scss";

import { Tabs } from "@/shared/ui/Tabs";
import { usePhotosessions } from "@/features/photosessions";
import { ProfileActionsBlock } from "@/shared/ui/PhotosBlock";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { PhotosessionItem } from "@/entities/photosessions/ui";
import { Pagination } from "@/shared/ui/Pagination";
import { ConfirmModal } from "@/shared/ui/Modal";

const ProfilePhotosessionsPage = () => {
    const [page, setPage] = React.useState(1);
    const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
    const [action, setAction] = React.useState<string | null>(null);

    const [confirmDeleteModal, setConfirmDeleteModal] = React.useState(false);

    const { getPhotosessions, deleteBulkPhotosessions } = usePhotosessions();

    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["photosessions", page],
        queryFn: () =>
            getPhotosessions({
                page,
            }),
    });

    const { data: photos, total, totalPages } = data || {};

    const selectPlace = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds((prev) => prev.filter((item) => item != id));
        } else {
            setSelectedIds((prev) => [...prev, id]);
        }
    };

    const deleteCheckedPlaces = () => {
        deleteBulkPhotosessions({ ids: selectedIds }, () => {
            queryClient.invalidateQueries({ queryKey: ["photosessions"] });
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
            <div className={styles.places}>
                <Tabs
                    tabs={[{ name: "Фотосессии" }]}
                    className={styles.placesTabs}
                />

                <div className={styles.placesContent}>
                    <ProfileActionsBlock
                        count={total}
                        elems={photos || []}
                        selectedIds={selectedIds}
                        setSelectedIds={setSelectedIds}
                        action={action}
                        setAction={setAction}
                        linkValue="/profile/photosessions/add"
                        linkText="Добавить фотосессию"
                        checkboxId="photosession_checkbox"
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
                            <div className={styles.placesItems}>
                                {(photos || []).map((data) => (
                                    <PhotosessionItem
                                        key={data.id}
                                        data={data}
                                        mode="edit"
                                        checkboxValue={selectedIds.includes(
                                            data.id,
                                        )}
                                        clickOnPhoto={() =>
                                            selectPlace(data.id)
                                        }
                                    />
                                ))}
                            </div>
                        ) : (
                            <NotContent text="Фотосессий еще нет" />
                        )}
                    </ProfileActionsBlock>
                </div>
            </div>

            <Pagination
                page={page}
                totalPages={totalPages || 0}
                setPage={setPage}
                isLoading={isLoading}
            />

            <ConfirmModal
                value={confirmDeleteModal}
                setValue={setConfirmDeleteModal}
                title={`Вы действительно хотите удалить ${selectedIds.length} фотосессий?`}
                callback={deleteCheckedPlaces}
                rejectCallback={() => setAction(null)}
            />
        </>
    );
};

export default ProfilePhotosessionsPage;
