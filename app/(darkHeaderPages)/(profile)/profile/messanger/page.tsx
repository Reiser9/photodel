"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import styles from "./index.module.scss";

import { Tabs } from "@/shared/ui/Tabs";
import { useMessanger } from "@/features/messanger";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { DialogItem } from "@/entities/messanger/ui";

const MessangerPage = () => {
    const [page, setPage] = React.useState(1);
    const { getChats } = useMessanger();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["chats", page],
        queryFn: () => getChats({ page, limit: 100 }),
    });

    const { data: chats } = data || {};

    return (
        <>
            <Tabs tabs={[{ name: "Сообщения" }]} />

            {isLoading ? (
                <Preloader small page />
            ) : isError ? (
                <NotContent
                    text="Произошла ошибка при загрузке данных"
                    danger
                />
            ) : !!chats?.length ? (
                <div className={styles.messangerDialogs}>
                    {chats.map((data) => (
                        <DialogItem key={data.id} data={data} />
                    ))}
                </div>
            ) : (
                <NotContent text="У вас еще нет диалогов" />
            )}
        </>
    );
};

export default MessangerPage;
