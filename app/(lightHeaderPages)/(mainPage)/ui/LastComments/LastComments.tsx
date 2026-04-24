"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import styles from "./index.module.scss";
import base from "@/shared/styles/base.module.scss";

import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { useReviews } from "@/features/reviews";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { formatDate } from "@/shared/utils/formatDate";

const LastComments = () => {
    const { getReviews } = useReviews();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["lastReviews"],
        queryFn: () =>
            getReviews({
                limit: 3,
                type: "photo",
            }),
    });

    const { data: comments } = data || {};

    return (
        <section className={styles.lastcomments}>
            <div className={base.container}>
                <div className={styles.lastcommentsInner}>
                    <h2 className={styles.lastcommentsTitle}>
                        Последние комментарии
                    </h2>

                    {isLoading ? (
                        <Preloader small page />
                    ) : isError ? (
                        <NotContent
                            text="Произошла ошибка при загрузке данных"
                            danger
                        />
                    ) : !!comments?.length ? (
                        <div className={styles.lastcommentsItems}>
                            {comments.map((data) => {
                                const { id, entity, createdAt, user, content } =
                                    data || {};
                                const {
                                    avatarUrl,
                                    isPro,
                                    firstName,
                                    lastName,
                                    id: userId,
                                } = user || {};
                                const { id: entityId, name } =
                                    (entity as { id: number; name: string }) ||
                                    {};

                                return (
                                    <div
                                        key={id}
                                        className={styles.lastcommentsItem}
                                    >
                                        <Link
                                            href={`/photos/${entityId}`}
                                            className={
                                                styles.lastcommentsItemTitle
                                            }
                                        >
                                            {name}
                                        </Link>

                                        <p
                                            className={
                                                styles.lastcommentsItemText
                                            }
                                        >
                                            {content}
                                        </p>

                                        <div
                                            className={
                                                styles.lastcommentsItemInfo
                                            }
                                        >
                                            <UserInfoBlock
                                                id={userId}
                                                image={avatarUrl}
                                                name={firstName || ""}
                                                surname={lastName || ""}
                                                isPro={isPro}
                                                status={formatDate(createdAt)}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <NotContent text="Комментариев на сайте нет" />
                    )}
                </div>
            </div>
        </section>
    );
};

export default LastComments;
