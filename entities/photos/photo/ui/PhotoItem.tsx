import React from "react";
import Link from "next/link";
import Image from "next/image";

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
};

const PhotoItem: React.FC<Props> = ({
    data,
    clickOnPhoto,
    checkboxValue,
    mode = "default",
}) => {
    const { imageUrl, name, id, favorites } = data || {};
    const { count, isFavorite } = favorites || {};

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
        <div className={styles.photoItem}>
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

                <StatsBlock
                    likes={675}
                    isLiked
                    favorites={count || 0}
                    isFavorites={isFavorite}
                    comments={346}
                    className={styles.photoItemStats}
                />
            </div>
        </div>
    );
};

export default PhotoItem;
