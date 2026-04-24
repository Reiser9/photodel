import React from "react";
import cn from "classnames";

import styles from "./index.module.scss";

import { Bookmark2, Comment, Heart, Star } from "@/shared/icons";

type Props = {
    isComment?: boolean;
    comments?: number | string;
    favorites?: number | string;
    isFavorites?: boolean;
    showFavorites?: boolean;
    showRate?: boolean;
    rate?: number | string;
    likes?: number | string;
    isLiked?: boolean;
    showLikes?: boolean;
    className?: string;
};

const StatsBlock: React.FC<Props> = ({
    comments,
    isComment = false,
    favorites,
    isFavorites = false,
    showFavorites = false,
    showRate = false,
    rate,
    likes,
    isLiked = false,
    showLikes = false,
    className = "",
}) => {
    return (
        <span className={cn(styles.actions, className)}>
            {showRate && (
                <span className={cn(styles.action, styles.rate)}>
                    <Star />
                    {rate || 0}
                </span>
            )}

            {showLikes && (
                <span
                    className={cn(styles.action, styles.like, {
                        [styles.active]: isLiked,
                    })}
                >
                    <Heart />
                    {likes || 0}
                </span>
            )}

            {isComment && (
                <span className={cn(styles.action, styles.comment)}>
                    <Comment />
                    {comments || 0}
                </span>
            )}

            {showFavorites && (
                <span
                    className={cn(styles.action, {
                        [styles.active]: isFavorites,
                    })}
                >
                    <Bookmark2 />
                    {favorites || 0}
                </span>
            )}
        </span>
    );
};

export default StatsBlock;
