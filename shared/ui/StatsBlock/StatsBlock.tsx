import React from "react";
import cn from "classnames";

import styles from "./index.module.scss";

import { Bookmark2, Comment, Heart, Star } from "@/shared/icons";

type Props = {
    likes?: number | string;
    comments?: number | string;
    favorites?: number | string;
    rate?: number | string;
    isLiked?: boolean;
    isFavorites?: boolean;
    className?: string;
};

const StatsBlock: React.FC<Props> = ({
    comments,
    favorites,
    likes,
    rate,
    isLiked = false,
    isFavorites = false,
    className = "",
}) => {
    return (
        <span className={cn(styles.actions, className)}>
            {rate && (
                <span className={cn(styles.action, styles.rate)}>
                    <Star />
                    {rate}
                </span>
            )}

            <span
                className={cn(styles.action, styles.like, {
                    [styles.active]: isLiked,
                })}
            >
                <Heart />
                {likes || 0}
            </span>

            {comments && (
                <span className={cn(styles.action, styles.comment)}>
                    <Comment />
                    {comments}
                </span>
            )}

            <span
                className={cn(styles.action, {
                    [styles.active]: isFavorites,
                })}
            >
                <Bookmark2 />
                {favorites || 0}
            </span>
        </span>
    );
};

export default StatsBlock;
