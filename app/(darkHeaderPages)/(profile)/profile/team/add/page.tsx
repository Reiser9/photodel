"use client";

import React from "react";
import cn from "classnames";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import styles from "./index.module.scss";

import { BackLink } from "@/shared/ui/BackLink";
import { usePlaces } from "@/features/places";
import { Button } from "@/shared/ui/Button";
import { Select } from "@/shared/ui/Select";
import { Input } from "@/shared/ui/Input";
import { useUserInfo } from "@/features/user";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { Pro } from "@/shared/ui/Pro";
import { Pagination } from "@/shared/ui/Pagination";
import { useTeam } from "@/features/team";

const TeamAddPage = () => {
    const [page, setPage] = React.useState(1);

    const [location, setLocation] = React.useState<number | null>(null);
    const [category, setCategory] = React.useState<number | null>(null);
    const [specialization, setSpecialization] = React.useState<number | null>(
        null,
    );
    const [search, setSearch] = React.useState("");
    const [locationsSearch, setLocationsSearch] = React.useState("");

    const debounceSearch = useDebounce(search, 500);
    const debounceLocationsSearch = useDebounce(locationsSearch, 500);

    const { getLocationPlaces } = usePlaces();
    const { requestTeam } = useTeam();

    const {
        data: locationsData,
        isLoading: locationsIsLoading,
        isError: locationsIsError,
    } = useQuery({
        queryKey: ["locations", debounceLocationsSearch],
        queryFn: () =>
            getLocationPlaces({
                search: debounceLocationsSearch,
            }),
    });

    const { data: locations } = locationsData || {};

    const { getUsers, getSpecializations, getCategories } = useUserInfo();

    const { data, isLoading, isError } = useQuery({
        queryKey: [
            "usersSearch",
            page,
            debounceSearch,
            location,
            category,
            specialization,
        ],
        queryFn: () =>
            getUsers({
                limit: 10,
                page,
                search: debounceSearch,
                ...(location && { place_id: location }),
                ...(specialization && { specialization_id: specialization }),
                ...(category && { pro_category_id: category }),
            }),
    });

    const { data: users, total, totalPages } = data || {};

    const {
        data: categories,
        isLoading: categoriesIsLoading,
        isError: categoriesIsError,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    });

    const {
        data: specializations,
        isLoading: specializationsIsLoading,
        isError: specializationsIsError,
    } = useQuery({
        queryKey: ["specializations"],
        queryFn: () => getSpecializations(),
    });

    const resetFilters = () => {
        setCategory(null);
        setLocation(null);
        setSpecialization(null);
        setSearch("");
    };

    return (
        <div className={styles.teamAdd}>
            <BackLink text="Моя команда" link="/profile/team" />

            <div className={styles.teamAddFilters}>
                <div className={styles.teamAddFilterItem}>
                    <Select
                        title="Местоположение"
                        value={location}
                        setValue={setLocation}
                        full
                        loading={locationsIsLoading}
                        error={locationsIsError}
                        options={locations?.map((data) => ({
                            label: data.city,
                            value: data.id,
                        }))}
                        showSearch={{
                            filterOption: false,
                            onSearch: (value) => setLocationsSearch(value),
                        }}
                        clear
                    />
                </div>

                <div className={styles.teamAddFilterItem}>
                    <Select
                        title="Категория"
                        value={category}
                        setValue={setCategory}
                        full
                        loading={categoriesIsLoading}
                        error={categoriesIsError}
                        options={
                            categories
                                ? categories?.map((data) => ({
                                      label: data.name,
                                      value: data.id,
                                  }))
                                : []
                        }
                        clear
                    />
                </div>

                <div className={styles.teamAddFilterItem}>
                    <Select
                        title="Специализация"
                        value={specialization}
                        setValue={setSpecialization}
                        full
                        loading={specializationsIsLoading}
                        error={specializationsIsError}
                        options={
                            specializations
                                ? specializations?.map((data) => ({
                                      label: data.name,
                                      value: data.id,
                                  }))
                                : []
                        }
                        clear
                    />
                </div>

                <div className={cn(styles.teamAddFilterItem, styles.full)}>
                    <Input
                        title="Икать по имени"
                        placeholder="Ввдеите Имя или Фамилию"
                        value={search}
                        setValue={setSearch}
                        full
                    />
                </div>

                <div className={styles.teamAddFilterButtons}>
                    <Button
                        color="grey"
                        auto
                        className={styles.teamAddFilterButton}
                        onClick={resetFilters}
                    >
                        Сбросить
                    </Button>
                </div>
            </div>

            <div className={styles.teamAddContent}>
                <p className={styles.teamAddCount}>
                    Найдено: <span>{total || 0}</span>
                </p>

                {isLoading ? (
                    <Preloader small page />
                ) : isError ? (
                    <NotContent
                        text="Произошла ошибка при загрузке данных"
                        danger
                    />
                ) : !!users?.length ? (
                    <div className={styles.teamAddItems}>
                        {users.map((data) => {
                            const {
                                id,
                                firstName,
                                lastName,
                                isPro,
                                location,
                                proCategories,
                                avatarUrl,
                            } = data || {};
                            const { place } = location || {};
                            const { city } = place || {};

                            return (
                                <div key={id} className={styles.teamAddItem}>
                                    <div className={styles.teamAddItemImage}>
                                        {avatarUrl && (
                                            <Image
                                                src={avatarUrl}
                                                alt={`Аватар пользователя ${firstName} ${lastName}`}
                                                fill
                                            />
                                        )}
                                    </div>

                                    <div className={styles.teamAddItemInfo}>
                                        <div
                                            className={
                                                styles.teamAddItemNameInner
                                            }
                                        >
                                            <p
                                                className={
                                                    styles.teamAddItemName
                                                }
                                            >
                                                {lastName} {firstName}
                                            </p>

                                            {isPro && <Pro />}
                                        </div>

                                        <div
                                            className={
                                                styles.teamAddItemCategoryInner
                                            }
                                        >
                                            {proCategories &&
                                                proCategories[0] && (
                                                    <p
                                                        className={
                                                            styles.teamAddItemCategory
                                                        }
                                                    >
                                                        {proCategories[0]?.name}
                                                    </p>
                                                )}

                                            {city && (
                                                <p
                                                    className={
                                                        styles.teamAddItemCity
                                                    }
                                                >
                                                    {city}
                                                </p>
                                            )}
                                        </div>

                                        <Button
                                            auto
                                            onClick={() => requestTeam(id)}
                                        >
                                            Отправить запрос
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <NotContent text="Пользователей нет" />
                )}

                <Pagination
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages || 0}
                    withoutPageParam
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default TeamAddPage;
