"use client";

import React from "react";
import cn from "classnames";
import { Map, Placemark } from "@iminside/react-yandex-maps";
import { useRouter, useSearchParams } from "next/navigation";

import styles from "./index.module.scss";

import { Close, MapIcon } from "@/shared/icons";
import { Input } from "@/shared/ui/Input";
import { Select } from "@/shared/ui/Select";
import { useQuery } from "@tanstack/react-query";
import { useUserInfo } from "@/features/user";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { NotContent } from "@/shared/ui/NotContent";
import { Preloader } from "@/shared/ui/Preloader";
import { Pagination } from "@/shared/ui/Pagination";
import { Button } from "@/shared/ui/Button";
import { buildQueryString } from "@/shared/utils/buildQueryString";
import { usePlaces } from "@/features/places";
import { Place } from "@/entities/places";
import { PlaceItem } from "@/entities/places/ui";

type Distance = "unlimit" | "5" | "100";
type Sort = "newest" | "popularity" | "distance";

const PlacesPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pageParam = searchParams.get("page");
    const mapIsShowParam = searchParams.get("mapIsShow");
    const searchParam = searchParams.get("search");
    const categoryParam = searchParams.get("category");
    const sortParam = searchParams.get("sort");

    const [page, setPage] = React.useState(1);

    const [mapIsShow, setMapIsShow] = React.useState(false);

    const [search, setSearch] = React.useState("");
    const [category, setCategory] = React.useState<number | null>(null);

    const [sort, setSort] = React.useState<Sort>("newest");

    const resetFilters = () => {
        setSearch("");
        setCategory(null);
    };

    const userSearchDebounce = useDebounce(search, 500);

    const { getSpecializations } = useUserInfo();
    const { getPlaces } = usePlaces();

    const {
        data: categories,
        isLoading: categoriesIsLoading,
        isError: categoriesIsError,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getSpecializations(),
    });

    const { data, isLoading, isError } = useQuery({
        queryKey: ["places", page, sort, userSearchDebounce, category],
        queryFn: () =>
            getPlaces({
                page,
                sort,
                search: userSearchDebounce,
                ...(category && { category }),
                isAuth: false
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
        if (categoryParam) {
            setCategory(+categoryParam || null);
        }
        if (sortParam === "popularity" || sortParam === "distance") {
            setSort(sortParam);
        }
    }, [pageParam, searchParam, mapIsShowParam, categoryParam, sortParam]);

    React.useEffect(() => {
        const queryString = buildQueryString({
            page,
            search,
            mapIsShow,
            category,
            sort,
        });
        if (queryString) {
            router.replace(`?${queryString}`);
        }
    }, [page, search, mapIsShow, category, sort]);

    return (
        <div className={styles.profies}>
            <div
                className={cn(styles.profiesContent, {
                    [styles.mapShow]: mapIsShow,
                })}
            >
                <p className={styles.profiesTitle}>Места для съемок</p>

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

                    {categories && (
                        <div className={styles.profiesFilterItem}>
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
                        </div>
                    )}

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
                            {total || 0} найдено
                        </p>

                        <div className={styles.profiesItemsSort}>
                            <Select
                                full
                                options={[
                                    {
                                        label: "По новизне",
                                        value: "newest",
                                    },
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
                        <div className={styles.placesItems}>
                            {(users || []).map((data) => (
                                <PlaceItem
                                    key={data.id}
                                    data={data as Place}
                                    showUser
                                    className={styles.profiesItem}
                                />
                            ))}
                        </div>
                    ) : (
                        <NotContent text="Мест для съемок не найдено" />
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

export default PlacesPage;
