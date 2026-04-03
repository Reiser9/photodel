"use client";

import React from "react";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import styles from "./index.module.scss";

import { Bookmark2, Comment, Heart } from "@/shared/icons";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { Rating } from "@/shared/ui/Rating";
import { Tabs } from "@/shared/ui/Tabs";
import { StatsBlock } from "@/shared/ui/StatsBlock";
import UserTopInfo from "@/app/(darkHeaderPages)/ui/UserTopInfo";
import { useUserInfo } from "@/features/user";
import { Pagination } from "@/shared/ui/Pagination";
import { NotContent } from "@/shared/ui/NotContent";
import { Preloader } from "@/shared/ui/Preloader";
import { PlaceItem } from "@/entities/places/ui";

const ProfilePlacesPage = () => {
    const { id } = useParams();

    const [page, setPage] = React.useState(1);

    const { getUsersPlacesById } = useUserInfo();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["usersPhotoById", id, page],
        queryFn: () => getUsersPlacesById(String(id), page),
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
