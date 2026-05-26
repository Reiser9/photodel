import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./index.module.scss";

import type { Photosession } from "../model";
import { Checkbox } from "@/shared/ui/Checkbox";
import { Edit2 } from "@/shared/icons";
import { StatsBlock } from "@/shared/ui/StatsBlock";

type Props = {
    data: Photosession;
    clickOnPhoto?: () => void;
    checkboxValue?: boolean;
    mode?: "default" | "edit" | "select";
};

const PhotosessionItem: React.FC<Props> = ({
    data,
    clickOnPhoto,
    checkboxValue,
    mode = "default",
}) => {
    const { likes, favorites, id, preview, location, name, reviews } =
        data || {};
    const { url } = preview || {};
    const { isLiked, count: likesCount } = likes || {};
    const { isFavorite, count: favoritesCount } = favorites || {};
    const { place } = location || {};
    const { city } = place || {};
    const { count: commentsCount } = reviews || {};

    const content = () => {
        return (
            <>
                {url && <Image src={url} alt={`${name} - фотосессия`} fill />}

                {(mode === "edit" || mode === "select") && (
                    <Checkbox
                        id={`photosession_checkbox_${id}`}
                        wrapperClass={styles.photosessionItemCheckbox}
                        value={checkboxValue}
                        auto
                    />
                )}
            </>
        );
    };

    return (
        <div className={styles.placesItem}>
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
                <Link
                    href={`/photosessions/${id}`}
                    className={styles.placesItemImage}
                >
                    {content()}
                </Link>
            )}

            <div className={styles.placesItemInfo}>
                {city && (
                    <span className={styles.placesItemLocation}>
                        <span>{city}</span>
                        {/* <span>5 км</span> */}
                    </span>
                )}

                {mode === "edit" ? (
                    <Link
                        href={`/profile/photosessions/edit/${id}`}
                        className={styles.placesItemTitle}
                    >
                        {name}

                        <Edit2 />
                    </Link>
                ) : (
                    <Link
                        href={`/photosessions/${id}`}
                        className={styles.placesItemTitle}
                    >
                        {name}
                    </Link>
                )}

                <StatsBlock
                    comments={commentsCount}
                    favorites={favoritesCount ?? 0}
                    likes={likesCount ?? 0}
                    isFavorites={isFavorite}
                    isLiked={isLiked}
                    showFavorites
                    showLikes
                />
            </div>
        </div>
    );
};

export default PhotosessionItem;
