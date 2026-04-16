import React from "react";
import Link from "next/link";
import Image from "next/image";
import cn from "classnames";

import styles from "./index.module.scss";

import type { Photo } from "../model";
import { Checkbox } from "@/shared/ui/Checkbox";
import { Edit2 } from "@/shared/icons";
import { StatsBlock } from "@/shared/ui/StatsBlock";

type Props = {
    data: Photo;
    clickOnPhoto?: () => void;
    checkboxValue?: boolean;
    mode?: "default" | "edit" | "select";
    showUser?: boolean;
    className?: string;
};

const PhotoItem: React.FC<Props> = ({
    data,
    clickOnPhoto,
    checkboxValue,
    mode = "default",
    showUser = false,
    className,
}) => {
    const { imageUrl, name, id, favorites, likes, reviews, user } = data || {};
    const { count: favoritesCount, isFavorite } = favorites || {};
    const { count: likesCount, isLiked } = likes || {};
    const { count: commentsCount } = reviews || {};
    const { avatarUrl, firstName, lastName, id: userId } = user || {};

    const content = () => {
        return (
            <>
                {imageUrl && (
                    <Image src={imageUrl} alt={`Изображение ${name}`} fill />
                )}

                {(mode === "edit" || mode === "select") && (
                    <Checkbox
                        id={`photo_checkbox_${id}`}
                        wrapperClass={styles.photoItemCheckbox}
                        value={checkboxValue}
                    />
                )}
            </>
        );
    };

    return (
        <div className={cn(styles.photoItem, className)}>
            {mode === "edit" || mode === "select" ? (
                <div
                    className={styles.photoItemImage}
                    onClick={() => {
                        if (!clickOnPhoto) return;

                        clickOnPhoto();
                    }}
                >
                    {content()}
                </div>
            ) : (
                <Link href={`/photos/${id}`} className={styles.photoItemImage}>
                    {content()}
                </Link>
            )}

            <div className={styles.photoItemInfo}>
                {mode === "edit" ? (
                    <Link
                        href={`/profile/photos/edit/${id}`}
                        className={styles.photoItemNameInner}
                    >
                        {name}

                        <Edit2 />
                    </Link>
                ) : (
                    <Link
                        href={`/photos/${id}`}
                        className={styles.photoItemNameInner}
                    >
                        {name}
                    </Link>
                )}

                {showUser && (
                    <Link
                        href={`/user/${userId}`}
                        className={styles.placesItemUser}
                    >
                        <span className={styles.placesItemUserImage}>
                            <Image
                                src={avatarUrl}
                                alt={`${firstName} ${lastName} аватар`}
                                fill
                            />
                        </span>

                        <span className={styles.placesItemUserName}>
                            {lastName} {firstName}
                        </span>
                    </Link>
                )}

                <StatsBlock
                    likes={likesCount || 0}
                    isLiked={isLiked}
                    showLikes
                    favorites={favoritesCount || 0}
                    isFavorites={isFavorite}
                    showFavorites
                    comments={commentsCount || 0}
                    isComment
                    className={styles.photoItemStats}
                />
            </div>
        </div>
    );
};

export default PhotoItem;
