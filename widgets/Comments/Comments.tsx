import React from "react";

import styles from "./index.module.scss";

import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { NotContent } from "@/shared/ui/NotContent";
import { Comment } from "@/shared/icons";
import { Preloader } from "@/shared/ui/Preloader";
import { Review } from "@/entities/review";
import { formatDate } from "@/shared/utils/formatDate";

type Props = {
    commentsIsLoading?: boolean;
    commentsIsError?: boolean;
    comments: Review[];
    children: React.ReactNode;
};

const Comments: React.FC<Props> = ({
    comments,
    commentsIsLoading = false,
    commentsIsError = false,
    children,
}) => {
    return (
        <div className={styles.photoByIdCommentInner}>
            <div className={styles.photoByIdCommentForm}>{children}</div>
            
            {commentsIsLoading ? (
                <Preloader small page />
            ) : commentsIsError ? (
                <NotContent
                    text="Произошла ошибка при загрузке данных"
                    danger
                />
            ) : !!comments.length ? (
                <div className={styles.photoByIdComments}>
                    {comments.map((data) => {
                        const { content, user, createdAt, id } = data || {};
                        const {
                            avatarUrl,
                            firstName,
                            isPro,
                            lastName,
                            id: userId,
                        } = user || {};

                        return (
                            <div key={id} className={styles.photoByIdComment}>
                                <UserInfoBlock
                                    id={userId}
                                    image={avatarUrl}
                                    name={firstName}
                                    surname={lastName}
                                    full
                                    isPro={isPro}
                                    status={formatDate(createdAt)}
                                />

                                <p className={styles.photoByIdCommentText}>
                                    {content}
                                </p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <NotContent
                    text="Еще никто не оставил комментарий. Будьте первыми!"
                    icon={<Comment />}
                />
            )}
        </div>
    );
};

export default Comments;
