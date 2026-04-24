"use client";

import React from "react";

import styles from "./index.module.scss";

import { Tabs } from "@/shared/ui/Tabs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pagination } from "@/shared/ui/Pagination";
import { ConfirmModal } from "@/shared/ui/Modal";
import { NotContent } from "@/shared/ui/NotContent";
import { Preloader } from "@/shared/ui/Preloader";
import { ProfileActionsBlock } from "@/shared/ui/PhotosBlock";
import TrainingItem from "@/entities/trainings/ui/TrainingItem";
import { useTrainings } from "@/features/trainings";

const ProfileTrainingsPage = () => {
    const [page, setPage] = React.useState(1);
    const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
    const [action, setAction] = React.useState<string | null>(null);

    const [confirmDeleteModal, setConfirmDeleteModal] = React.useState(false);

    const { getTrainings, deleteBulkTrainings } = useTrainings();

    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["trainings", page],
        queryFn: () =>
            getTrainings({
                page,
                my: true,
            }),
    });

    const { data: trainings, total, totalPages } = data || {};

    const selectPlace = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds((prev) => prev.filter((item) => item != id));
        } else {
            setSelectedIds((prev) => [...prev, id]);
        }
    };

    const deleteCheckedPlaces = () => {
        deleteBulkTrainings({ ids: selectedIds }, () => {
            queryClient.invalidateQueries({ queryKey: ["trainings"] });
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
                <Tabs tabs={[{ name: "Обучение" }]} />

                <div className={styles.placesContent}>
                    <ProfileActionsBlock
                        count={total}
                        elems={trainings || []}
                        selectedIds={selectedIds}
                        setSelectedIds={setSelectedIds}
                        action={action}
                        setAction={setAction}
                        linkValue="/profile/trainings/add"
                        linkText="Добавить обучение"
                        checkboxId="trainings_checkbox"
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
                                {(trainings || []).map((data) => (
                                    <TrainingItem
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
                            <NotContent text="Обучений еще нет" />
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
                title={`Вы действительно хотите удалить ${selectedIds.length} обучений?`}
                callback={deleteCheckedPlaces}
                rejectCallback={() => setAction(null)}
            />
        </>
    );
};

export default ProfileTrainingsPage;
