import React from "react";
import Image from "next/image";
import cn from "classnames";

import styles from "./index.module.scss";

import { Bookmark2, Comment, Eye, Heart } from "@/shared/icons";

type Props = {
    image: string;
    views: string | number;
    likes: string | number;
    comments: string | number;
    favorites: string | number;
    date: string;
    title: string;
    text: string | React.ReactNode;
};

const PhotoInfoBlock: React.FC<Props> = ({
    image,
    comments,
    favorites,
    likes,
    views,
    date,
    title,
    text,
}) => {
    return (
        <>
            <div className={styles.photoByIdImageInner}>
                <Image src={image} alt="Изображение" fill />
            </div>

            <div className={styles.photoByIdActions}>
                <div className={styles.photoByIdActionsContent}>
                    <p className={styles.photoByIdAction} title="Просмотры">
                        <Eye />
                        {views}
                    </p>

                    <button
                        className={cn(
                            styles.photoByIdAction,
                            styles.like,
                            styles.active,
                        )}
                    >
                        <Heart />
                        {likes}
                    </button>

                    <p className={cn(styles.photoByIdAction, styles.comment)}>
                        <Comment />
                        {comments}
                    </p>

                    <button
                        className={cn(
                            styles.photoByIdAction,
                            styles.favorite,
                            styles.active,
                        )}
                    >
                        <Bookmark2 />
                        {favorites}
                    </button>
                </div>

                <p className={styles.photoByIdDate}>{date}</p>
            </div>

            <div className={styles.photoByIdTextInner}>
                <p className={styles.photoByIdTextTitle}>{title}</p>

                <div className={styles.photoByIdTextDescription}>{text}</div>
            </div>
        </>
    );
};

export default PhotoInfoBlock;
