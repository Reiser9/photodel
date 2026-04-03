"use client";

import React from "react";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

import styles from "./index.module.scss";

import { Bookmark2, Comment, Heart } from "@/shared/icons";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { Rating } from "@/shared/ui/Rating";
import { Tabs } from "@/shared/ui/Tabs";
import { StatsBlock } from "@/shared/ui/StatsBlock";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePlaces } from "@/features/places";
import { Pagination } from "@/shared/ui/Pagination";
import { ConfirmModal } from "@/shared/ui/Modal";
import { NotContent } from "@/shared/ui/NotContent";
import { Preloader } from "@/shared/ui/Preloader";
import { ProfileActionsBlock } from "@/shared/ui/PhotosBlock";
import { PlaceItem } from "@/entities/places/ui";

const ProfilePlacesPage = () => {
    const [page, setPage] = React.useState(1);
    const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
    const [action, setAction] = React.useState<string | null>(null);

    const [confirmDeleteModal, setConfirmDeleteModal] = React.useState(false);

    const { getMyPlaces, deleteBulkPlaces } = usePlaces();

    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["myPlaces", page],
        queryFn: () =>
            getMyPlaces({
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
        deleteBulkPlaces({ ids: selectedIds }, () => {
            queryClient.invalidateQueries({ queryKey: ["myPlaces"] });
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
                    tabs={[{ name: "Места для съемок" }]}
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
                        linkValue="/profile/places/add"
                        linkText="Добавить место для фото"
                        checkboxId="places_checkbox"
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
                                    <PlaceItem
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
                            <NotContent text="Мест для фото еще нет" />
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
                title={`Вы действительно хотите удалить ${selectedIds.length} фото?`}
                callback={deleteCheckedPlaces}
                rejectCallback={() => setAction(null)}
            />
        </>
    );
};

export default ProfilePlacesPage;
