"use client";

import React from "react";
import Link from "next/link";
import cn from "classnames";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "./index.module.scss";

import { useMessanger } from "@/features/messanger";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { ArrowLeft, Dots, Send } from "@/shared/icons";
import { Pro } from "@/shared/ui/Pro";
import { getFormattedDate } from "@/shared/utils/getFormattedDate";
import { HoverMenu } from "@/shared/ui/HoverMenu";
import { ConfirmModal } from "@/shared/ui/Modal";

const MessangerDialogPage = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const router = useRouter();

    const [message, setMessage] = React.useState("");
    const [messengerMoreMenu, setMessengerMoreMenu] = React.useState(false);
    const [deleteChatConfirmModal, setDeleteChatConfirmModal] =
        React.useState(false);

    const messengerMenuRef = React.useRef<HTMLDivElement>(null);

    const {
        getChatById,
        getChatMessages,
        sendMessage,
        deleteChat,
        readMessage,
    } = useMessanger();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["chatById", id],
        queryFn: () => getChatById(String(id)),
    });

    const { title, picture, id: chatId, userId } = data || {};

    const {
        data: messagesData,
        isLoading: messagesIsLoading,
        isError: messagesIsError,
    } = useQuery({
        queryKey: ["chatMessagesById", id],
        queryFn: () => getChatMessages(String(id)),
    });

    const { data: messages } = messagesData || {};

    const sendMessageHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!message || !chatId) return;

        sendMessage(chatId, message, "chat", () => {
            queryClient.invalidateQueries({ queryKey: ["chatMessagesById"] });
            queryClient.invalidateQueries({ queryKey: ["chatById"] });
            queryClient.invalidateQueries({
                queryKey: ["messangerUnreadCount"],
            });
            setMessage("");
        });
    };

    const deleteChatHandler = () => {
        deleteChat(String(id), () => router.push("/profile/messanger"));
    };

    React.useEffect(() => {
        if (data && data.latestMessage && data.latestMessage.id) {
            readMessage(data.latestMessage.id, () =>
                queryClient.invalidateQueries({
                    queryKey: ["messangerUnreadCount"],
                }),
            );
        }
    }, [data]);

    if (isLoading) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent text="Произошла ошибка при загрузке данных" />;
    }

    return (
        <>
            <div className={styles.messangerContent}>
                <div className={styles.messangerTop}>
                    <Link
                        href="/profile/messanger"
                        className={styles.messangerTopBack}
                    >
                        <ArrowLeft />
                        Все сообщения
                    </Link>

                    <Link
                        href={`/user/${userId}`}
                        className={styles.messangerTopInfo}
                    >
                        <span className={styles.messangerTopAvatar}>
                            <Image
                                src={picture ?? "/img/placeholder.png"}
                                alt={`Аватар ${title}`}
                                fill
                            />
                        </span>

                        <span className={styles.messangerTopName}>{title}</span>
                    </Link>

                    <div
                        ref={messengerMenuRef}
                        onClick={() => setMessengerMoreMenu((prev) => !prev)}
                        className={styles.messangerMore}
                    >
                        <HoverMenu
                            button={<Dots />}
                            value={messengerMoreMenu}
                            setValue={setMessengerMoreMenu}
                            overlayClass={styles.messangerMoreOverlay}
                            contentClass={styles.messangerMoreMenuContent}
                        >
                            <div className={styles.messangerMoreButtons}>
                                <button
                                    className={styles.messangerMoreButton}
                                    onClick={() => {
                                        setDeleteChatConfirmModal(true);
                                        setMessengerMoreMenu(false);
                                    }}
                                >
                                    Удалить переписку
                                </button>
                            </div>
                        </HoverMenu>
                    </div>
                </div>

                <div className={styles.messangerDialogContent}>
                    {messagesIsLoading ? (
                        <Preloader small page />
                    ) : messagesIsError ? (
                        <NotContent
                            text="Произошла ошибка при загрузке данных"
                            danger
                        />
                    ) : !!messages?.length ? (
                        messages.map((data) => {
                            const { id, content, sender, createdAt } =
                                data || {};
                            const {
                                avatarUrl,
                                firstName,
                                lastName,
                                isPro,
                                id: userId,
                            } = sender || {};

                            return (
                                <div
                                    key={id}
                                    className={styles.messangerDialogItem}
                                >
                                    <Link
                                        href={`/user/${userId}`}
                                        className={
                                            styles.messangerDialogItemInfo
                                        }
                                    >
                                        <span
                                            className={
                                                styles.messangerDialogItemAvatar
                                            }
                                        >
                                            <Image
                                                src={
                                                    avatarUrl ??
                                                    "/img/placeholder.png"
                                                }
                                                alt={`Аватар ${firstName} ${lastName}`}
                                                fill
                                            />
                                        </span>

                                        <span
                                            className={
                                                styles.messangerDialogItemName
                                            }
                                        >
                                            {lastName} {firstName}
                                        </span>

                                        {isPro && <Pro />}

                                        <span
                                            className={
                                                styles.messangerDialogItemTime
                                            }
                                        >
                                            {getFormattedDate(
                                                new Date(createdAt),
                                                "short",
                                            )}
                                        </span>
                                    </Link>

                                    <div
                                        className={
                                            styles.messangerDialogItemText
                                        }
                                    >
                                        {content}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <NotContent text="В диалоге нет сообщений. Отправьте первое" />
                    )}
                </div>

                <form
                    onSubmit={sendMessageHandler}
                    className={styles.messangerSendInner}
                >
                    <input
                        className={styles.messangerSendInput}
                        placeholder="Напишите сообщение"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <button
                        className={cn(styles.messangerSendButton, {
                            [styles.disabled]: !message,
                        })}
                    >
                        <Send />
                    </button>
                </form>
            </div>

            <ConfirmModal
                value={deleteChatConfirmModal}
                setValue={setDeleteChatConfirmModal}
                title="Вы действительно хотите удалить диалог?"
                callback={deleteChatHandler}
            />
        </>
    );
};

export default MessangerDialogPage;
