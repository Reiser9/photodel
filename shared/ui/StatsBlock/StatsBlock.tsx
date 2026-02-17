import React from "react";
import cn from "classnames";

import styles from "./index.module.scss";

import { Bookmark2, Comment, Heart } from "@/shared/icons";

type Props = {
    likes: number | string;
    comments: number | string;
    favorites: number | string;
    isLiked?: boolean;
    isFavorites?: boolean;
};

const StatsBlock: React.FC<Props> = ({
    comments,
    favorites,
    likes,
    isLiked = false,
    isFavorites = false,
}) => {
    return (
        <span className={styles.actions}>
            <span
                className={cn(styles.action, styles.like, {
                    [styles.active]: isLiked,
                })}
            >
                <Heart />
                {likes}
            </span>

            <span className={cn(styles.action, styles.comment)}>
                <Comment />
                {comments}
            </span>

            <span
                className={cn(styles.action, {
                    [styles.active]: isFavorites,
                })}
            >
                <Bookmark2 />
                {favorites}
            </span>
        </span>
    );
};

export default StatsBlock;
