"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./index.module.scss";

import type { Chat } from "../model";
import { getFormattedDate } from "@/shared/utils/getFormattedDate";
import { useQuery } from "@tanstack/react-query";
import { useUserInfo } from "@/features/user";

type Props = {
    data: Chat;
};

const DialogItem: React.FC<Props> = ({ data }) => {
    const { getShortInfo } = useUserInfo();

    const { data: userData } = useQuery({
        queryKey: ["shortInfo"],
        queryFn: () => getShortInfo(),
    });

    const { id: myId } = userData || {};

    const { id, latestMessage, picture, title, unreadCount } = data || {};
    const { content, createdAt, sender } = latestMessage || {};
    const { id: senderId, avatarUrl, firstName, lastName } = sender || {};

    return (
        <Link
            href={`/profile/messanger/${id}`}
            className={styles.messangerDialog}
        >
            <span className={styles.messangerDialogInfo}>
                <span className={styles.messangerDialogAvatar}>
                    {picture && (
                        <Image src={picture} alt={`Аватар ${title}`} fill />
                    )}
                </span>

                <span className={styles.messangerDialogContent}>
                    <span className={styles.messangerDialogUser}>
                        <span className={styles.messangerDialogUserName}>
                            {title}
                        </span>
                    </span>

                    <span className={styles.messangerDialogLastMessageInner}>
                        {senderId === myId && (
                            <span
                                className={
                                    styles.messangerDialogLastMessageAvatar
                                }
                            >
                                <Image
                                    src={avatarUrl ?? "/img/placeholder.png"}
                                    alt={`Аватар ${firstName} ${lastName}`}
                                    fill
                                />
                            </span>
                        )}

                        <span className={styles.messangerDialogLastMessage}>
                            {content}
                        </span>
                    </span>
                </span>
            </span>

            <span className={styles.messangerDialogTime}>
                <span className={styles.messangerDialogTimeValue}>
                    {getFormattedDate(new Date(createdAt), "short")}
                </span>
                {!!unreadCount && (
                    <span className={styles.messangerDialogUnreadCount}>
                        {unreadCount}
                    </span>
                )}
            </span>
        </Link>
    );
};

export default DialogItem;
