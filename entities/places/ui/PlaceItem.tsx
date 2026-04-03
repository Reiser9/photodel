import React from "react";
import Link from "next/link";
import Image from "next/image";

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
};

const PlaceItem: React.FC<Props> = ({
    data,
    clickOnPhoto,
    checkboxValue,
    mode = "default",
}) => {
    const { preview, name, id, likes, favorites, location } = data || {};
    const { address } = location || {};
    const { count: favoritesCount, isFavorite } = favorites || {};
    const { count: likesCount, isLiked } = likes || {};
    const { url } = preview || {};

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
                    href={`/places/${id}`}
                    className={styles.placesItemImage}
                >
                    {content()}
                </Link>
            )}

            <span className={styles.placesItemInfo}>
                {address && (
                    <span className={styles.placesItemLocation}>
                        <span>{address}</span>
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

                <StatsBlock
                    comments={12}
                    favorites={favoritesCount ?? 0}
                    likes={likesCount ?? 0}
                    isFavorites={isFavorite}
                    isLiked={isLiked}
                />
            </span>
        </div>
    );
};

export default PlaceItem;
