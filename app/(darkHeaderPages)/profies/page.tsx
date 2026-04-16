"use client";

import React from "react";
import cn from "classnames";
import { Map, Placemark } from "@iminside/react-yandex-maps";
import { useRouter, useSearchParams } from "next/navigation";

import styles from "./index.module.scss";

import { Close, Filter, MapIcon } from "@/shared/icons";
import { Input } from "@/shared/ui/Input";
import { Select } from "@/shared/ui/Select";
import { useQuery } from "@tanstack/react-query";
import { useUserInfo } from "@/features/user";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { NotContent } from "@/shared/ui/NotContent";
import { Preloader } from "@/shared/ui/Preloader";
import { UserItem } from "@/entities/user/ui";
import { UserByIdShortInfo } from "@/entities/user";
import { Pagination } from "@/shared/ui/Pagination";
import { Button } from "@/shared/ui/Button";
import { buildQueryString } from "@/shared/utils/buildQueryString";

type Distance = "unlimit" | "5" | "100";
type Sort = "popularity" | "distance";

const ProfiesPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pageParam = searchParams.get("page");
    const mapIsShowParam = searchParams.get("mapIsShow");
    const searchParam = searchParams.get("search");
    const radiusParam = searchParams.get("radius");
    const categoryParam = searchParams.get("category");
    const sortParam = searchParams.get("sort");

    const [page, setPage] = React.useState(1);

    const [mapIsShow, setMapIsShow] = React.useState(false);

    const [search, setSearch] = React.useState("");
    const [radius, setRadius] = React.useState<Distance>("unlimit");
    const [category, setCategory] = React.useState<number | null>(null);

    const [sort, setSort] = React.useState<Sort>("popularity");

    const userSearchDebounce = useDebounce(search, 500);

    const resetFilters = () => {
        setSearch("");
        setRadius("unlimit");
        setCategory(null);
    };

    const { getUsers, getCategories } = useUserInfo();

    const {
        data: categories,
        isLoading: categoriesIsLoading,
        isError: categoriesIsError,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    });

    const { data, isLoading, isError } = useQuery({
        queryKey: [
            "usersSearch",
            page,
            userSearchDebounce,
            sort,
            radius,
            category,
        ],
        queryFn: () =>
            getUsers({
                page,
                search: userSearchDebounce,
                sort,
                ...(radius !== "unlimit" && { radius: +radius }),
                ...(category && { pro_category_id: category }),
            }),
    });

    const { data: users, total, totalPages } = data || {};

    React.useEffect(() => {
        if (pageParam && +pageParam >= 1) {
            setPage(+pageParam);
        }
        if (searchParam) {
            setSearch(searchParam);
        }
        if (mapIsShowParam === "true" || mapIsShowParam === "false") {
            setMapIsShow(mapIsShowParam === "true");
        }
        if (
            radiusParam === "unlimit" ||
            radiusParam === "5" ||
            radiusParam === "100"
        ) {
            setRadius(radiusParam);
        }
        if (categoryParam) {
            setCategory(+categoryParam || null);
        }
        if (sortParam === "popularity" || sortParam === "distance") {
            setSort(sortParam);
        }
    }, [
        pageParam,
        searchParam,
        mapIsShowParam,
        radiusParam,
        categoryParam,
        sortParam,
    ]);

    React.useEffect(() => {
        const queryString = buildQueryString({
            page,
            search,
            mapIsShow,
            radius,
            category,
            sort,
        });
        if (queryString) {
            router.replace(`?${queryString}`);
        }
    }, [page, search, mapIsShow, radius, category, sort]);

    return (
        <div className={styles.profies}>
            <div
                className={cn(styles.profiesContent, {
                    [styles.mapShow]: mapIsShow,
                })}
            >
                <p className={styles.profiesTitle}>Профи рядом с Вами</p>

                <div className={styles.profiesFilters}>
                    <div className={styles.profiesFilterItem}>
                        <Input
                            title="Простой поиск"
                            placeholder="Введите что-нибудь"
                            full
                            value={search}
                            setValue={setSearch}
                        />
                    </div>

                    <div className={styles.profiesFilterItem}>
                        <Select
                            title="Радиус"
                            options={[
                                {
                                    label: "Без ограничения",
                                    value: "unlimit",
                                },
                                {
                                    label: "В пределах 5 км",
                                    value: "5",
                                },
                                {
                                    label: "В пределах 100 км",
                                    value: "100",
                                },
                            ]}
                            value={radius}
                            setValue={setRadius}
                            placeholder="Выберите радиус"
                            full
                        />
                    </div>

                    <div className={styles.profiesFilterItem}>
                        {categories && (
                            <Select
                                title="Категория"
                                placeholder="Выберите категорию"
                                full
                                options={categories?.map((data) => ({
                                    label: data.name,
                                    value: data.id,
                                }))}
                                error={categoriesIsError}
                                loading={categoriesIsLoading}
                                value={category}
                                setValue={setCategory}
                                allowClear
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                            />
                        )}
                    </div>

                    <div className={styles.profiesFilterItem}>
                        <Button color="grey" onClick={resetFilters}>
                            Сбросить
                        </Button>
                    </div>
                </div>

                {!mapIsShow && (
                    <div className={styles.profiesBar}>
                        {/* <button className={styles.profiesFilterButton}>
                            <Filter />
                            Все фильтры
                        </button> */}

                        <button
                            onClick={() => setMapIsShow(true)}
                            className={styles.profiesMapButton}
                        >
                            <MapIcon />
                            Показать карту
                        </button>
                    </div>
                )}

                <div className={styles.profiesItemsInner}>
                    <div className={styles.profiesItemsTitleInner}>
                        <p className={styles.profiesItemsTitle}>
                            {total} найдено
                        </p>

                        <div className={styles.profiesItemsSort}>
                            <Select
                                full
                                options={[
                                    {
                                        label: "По популярности",
                                        value: "popularity",
                                    },
                                    {
                                        label: "По расстоянию",
                                        value: "distance",
                                    },
                                ]}
                                value={sort}
                                setValue={setSort}
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <Preloader page small />
                    ) : isError ? (
                        <NotContent
                            text="Произошла ошибка при загрузке данных"
                            danger
                        />
                    ) : total && total > 0 ? (
                        <div className={styles.profiesItems}>
                            {(users || []).map((data) => (
                                <UserItem
                                    key={data.id}
                                    data={data as UserByIdShortInfo}
                                    className={styles.profiesItem}
                                />
                            ))}
                        </div>
                    ) : (
                        <NotContent text="Пользователей не найдено" />
                    )}
                </div>

                <Pagination
                    page={page}
                    totalPages={totalPages || 0}
                    setPage={setPage}
                    isLoading={isLoading}
                    className={styles.profiesPagination}
                    withoutPageParam
                />
            </div>

            {mapIsShow && (
                <div className={styles.profiesMap}>
                    <button
                        className={styles.profiesMapClose}
                        onClick={() => setMapIsShow(false)}
                    >
                        <Close />
                        Скрыть карту
                    </button>

                    <Map
                        defaultState={{
                            center: [55.751574, 37.573856],
                            zoom: 4,
                            controls: [],
                        }}
                        width="100%"
                        height="100%"
                        className={styles.tempLocationItemMap}
                    >
                        {users?.map((data) => {
                            const { location } = data || {};
                            const { latitude, longitude } = location || {};

                            return (
                                <Placemark
                                    key={data.id}
                                    geometry={[latitude, longitude]}
                                    options={{ iconColor: "#50A398" }}
                                />
                            );
                        })}
                    </Map>
                </div>
            )}
        </div>
    );
};

export default ProfiesPage;
