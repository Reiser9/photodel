"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import styles from "./index.module.scss";

import { Tabs } from "@/shared/ui/Tabs";
import UserTopInfo from "@/app/(darkHeaderPages)/ui/UserTopInfo";
import { Pagination } from "@/shared/ui/Pagination";
import { NotContent } from "@/shared/ui/NotContent";
import { Preloader } from "@/shared/ui/Preloader";
import { PlaceItem } from "@/entities/places/ui";
import { usePlaces } from "@/features/places";

const ProfilePlacesPage = () => {
    const { id } = useParams();

    const [page, setPage] = React.useState(1);

    const { getPlaces } = usePlaces();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["places", id, page],
        queryFn: () =>
            getPlaces({
                page,
                user_id: String(id),
            }),
        enabled: !!id,
    });

    const { total, totalPages, data: places } = data || {};

    return (
        <>
            <UserTopInfo />

            <Tabs tabs={[{ name: "Места для съемок" }]} />

            <p className={styles.placesCount}>
                Всего: <span>{total || 0}</span>
            </p>

            {isLoading ? (
                <Preloader page small />
            ) : isError ? (
                <NotContent
                    text="Произошла ошибка при загрузке данных"
                    danger
                />
            ) : !!places?.length ? (
                <div className={styles.placesItems}>
                    {places.map((data) => (
                        <PlaceItem key={data.id} data={data} />
                    ))}
                </div>
            ) : (
                <NotContent text="Пользователь еще не создал ни одного места для съемки" />
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

export default ProfilePlacesPage;
