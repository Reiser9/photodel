import React from "react";
import Link from "next/link";
import Image from "next/image";
import cn from "classnames";

import styles from "./index.module.scss";

import type { Place } from "../model";
import { StatsBlock } from "@/shared/ui/StatsBlock";
import { Checkbox } from "@/shared/ui/Checkbox";
import { Edit2 } from "@/shared/icons";

type Props = {
    data: Place;
    clickOnPhoto?: () => void;
    checkboxValue?: boolean;
    mode?: "default" | "edit" | "select";
    showUser?: boolean;
    className?: string;
};

const PlaceItem: React.FC<Props> = ({
    data,
    clickOnPhoto,
    checkboxValue,
    mode = "default",
    showUser = false,
    className,
}) => {
    const { preview, name, id, likes, favorites, location, user, reviews } =
        data || {};
    const { place } = location || {};
    const { city } = place || {};
    const { count: favoritesCount, isFavorite } = favorites || {};
    const { count: likesCount, isLiked } = likes || {};
    const { count: reviewsCount } = reviews || {};
    const { url } = preview || {};
    const { avatarUrl, lastName, firstName, id: userId } = user || {};

    const content = () => {
        return (
            <>
                {url && (
                    <Image src={url} alt={`${name} - место для съемки`} fill />
                )}

                {(mode === "edit" || mode === "select") && (
                    <Checkbox
                        id={`place_checkbox_${id}`}
                        wrapperClass={styles.placeItemCheckbox}
                        value={checkboxValue}
                    />
                )}
            </>
        );
    };

    return (
        <div className={cn(styles.placesItem, className)}>
            {mode === "edit" || mode === "select" ? (
                <div
                    className={styles.placesItemImage}
                    onClick={() => {
                        if (!clickOnPhoto) return;

                        clickOnPhoto();
                    }}
                >
                    {content()}
                </div>
            ) : (
                <Link href={`/places/${id}`} className={styles.placesItemImage}>
                    {content()}
                </Link>
            )}

            <span className={styles.placesItemInfo}>
                {city && (
                    <span className={styles.placesItemLocation}>
                        <span>{city}</span>
                        <span>5 км</span>
                    </span>
                )}

                {mode === "edit" ? (
                    <Link
                        href={`/profile/places/edit/${id}`}
                        className={styles.placesItemTitle}
                    >
                        {name}

                        <Edit2 />
                    </Link>
                ) : (
                    <Link
                        href={`/places/${id}`}
                        className={styles.placesItemTitle}
                    >
                        {name}
                    </Link>
                )}

                {showUser && user && (
                    <Link
                        href={`/user/${userId}`}
                        className={styles.placesItemUser}
                    >
                        <span className={styles.placesItemUserImage}>
                            <Image
                                src={avatarUrl ?? "/img/placeholder.png"}
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
                    comments={reviewsCount || 0}
                    favorites={favoritesCount || 0}
                    likes={likesCount || 0}
                    isFavorites={isFavorite}
                    isLiked={isLiked}
                    showFavorites
                    showLikes
                    isComment
                />
            </span>
        </div>
    );
};

export default PlaceItem;
