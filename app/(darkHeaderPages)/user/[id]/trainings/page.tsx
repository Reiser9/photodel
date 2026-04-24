"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import styles from "./index.module.scss";
import { useParams } from "next/navigation";
import UserTopInfo from "@/app/(darkHeaderPages)/ui/UserTopInfo";
import { Tabs } from "@/shared/ui/Tabs";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { Pagination } from "@/shared/ui/Pagination";
import { PhotosessionItem } from "@/entities/photosessions/ui";
import { useTrainings } from "@/features/trainings";
import TrainingItem from "@/entities/trainings/ui/TrainingItem";

const UserPhotosessionsPage = () => {
    const { id } = useParams();

    const [page, setPage] = React.useState(1);

    const { getTrainings } = useTrainings();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["usersTrainingsById", id, page],
        queryFn: () =>
            getTrainings({
                user_id: String(id),
                page,
            }),
        enabled: !!id,
    });

    const { total, totalPages, data: photosessions } = data || {};

    return (
        <>
            <UserTopInfo />

            <Tabs tabs={[{ name: "Обучение" }]} />

            <p className={styles.photosessionsCount}>
                Всего: <span>{total || 0}</span>
            </p>

            {isLoading ? (
                <Preloader page small />
            ) : isError ? (
                <NotContent
                    text="Произошла ошибка при загрузке данных"
                    danger
                />
            ) : !!photosessions?.length ? (
                <div className={styles.photosessionsItems}>
                    {photosessions.map((data) => (
                        <TrainingItem key={data.id} data={data} />
                    ))}
                </div>
            ) : (
                <NotContent text="Пользователь еще не создал ни одного обучения" />
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

export default UserPhotosessionsPage;
