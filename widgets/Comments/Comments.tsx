import React from "react";

import styles from "./index.module.scss";

import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { NotContent } from "@/shared/ui/NotContent";
import { Comment } from "@/shared/icons";

type Props = {
    comments: {
        id: number | string;
        image: string;
        name: string;
        surname: string;
        isPro?: boolean;
        status: string;
        comment: string;
    }[];
    children: React.ReactNode;
};

const Comments: React.FC<Props> = ({ comments, children }) => {
    return (
        <div className={styles.photoByIdCommentInner}>
            {!!comments.length ? (
                <div className={styles.photoByIdComments}>
                    {comments.map((data) => (
                        <div key={data.id} className={styles.photoByIdComment}>
                            <UserInfoBlock
                                id={data.id}
                                image={data.image}
                                name={data.name}
                                surname={data.surname}
                                full
                                isPro={data.isPro}
                                status={data.status}
                            />

                            <p className={styles.photoByIdCommentText}>
                                {data.comment}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <NotContent
                    text="Еще никто не оставил комментарий. Будьте первыми!"
                    icon={<Comment />}
                />
            )}

            <div className={styles.photoByIdCommentForm}>{children}</div>
        </div>
    );
};

export default Comments;
