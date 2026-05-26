"use client";

import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "./index.module.scss";

import useAdmin from "@/features/admin/useAdmin";
import { Pagination } from "@/shared/ui/Pagination";
import { NotContent } from "@/shared/ui/NotContent";
import { Preloader } from "@/shared/ui/Preloader";
import { Button } from "@/shared/ui/Button";
import { Select } from "@/shared/ui/Select";
import { Input } from "@/shared/ui/Input";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useUserInfo } from "@/features/user";
import { UserByIdShortInfo } from "@/entities/user";
import { UserItem } from "@/entities/user/ui";
import { ConfirmModal } from "@/shared/ui/Modal";

const AdminUsersPage = () => {
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [category, setCategory] = React.useState<number | null>(null);

    const userSearchDebounce = useDebounce(search, 500);

    const [currentUserId, setCurrentUserId] = React.useState(0);
    const [confirmBlockModal, setConfirmBlockModal] = React.useState(false);
    const [confirmUnblockModal, setConfirmUnblockModal] = React.useState(false);

    const queryClient = useQueryClient();

    const invalidateUsers = () => {
        queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    };

    const resetFilters = () => {
        setSearch("");
        setCategory(null);
    };

    const { getAdminUsers, blockUser, unblockUser } = useAdmin();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["adminUsers", page, userSearchDebounce, category],
        queryFn: () =>
            getAdminUsers({
                page,
                search: userSearchDebounce,
                ...(category && { pro_category_id: category }),
            }),
    });

    const { data: users, total, totalPages } = data || {};

    const { getCategories } = useUserInfo();

    const {
        data: categories,
        isLoading: categoriesIsLoading,
        isError: categoriesIsError,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    });

    return (
        <>
            <div className={styles.usersAdmin}>
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

                <div className={styles.profiesItemsInner}>
                    <div className={styles.profiesItemsTitleInner}>
                        <p className={styles.profiesItemsTitle}>
                            {total || 0} найдено
                        </p>
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
                                    isAdmin
                                    isBlocked={data.isBlocked}
                                    blockCallback={() => {
                                        setCurrentUserId(data.id);
                                        setConfirmBlockModal(true);
                                    }}
                                    unblockCallback={() => {
                                        setCurrentUserId(data.id);
                                        setConfirmUnblockModal(true);
                                    }}
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

            <ConfirmModal
                value={confirmBlockModal}
                setValue={setConfirmBlockModal}
                title="Вы действительно хотите заблокировать пользователя?"
                callback={() => blockUser(currentUserId, invalidateUsers)}
            />

            <ConfirmModal
                value={confirmUnblockModal}
                setValue={setConfirmUnblockModal}
                title="Вы действительно хотите разблокировать пользователя?"
                callback={() => unblockUser(currentUserId, invalidateUsers)}
            />
        </>
    );
};

export default AdminUsersPage;
