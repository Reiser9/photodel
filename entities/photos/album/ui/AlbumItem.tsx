import React from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./index.module.scss";

import type { Album } from "../model";
import { Edit2 } from "@/shared/icons";
import { Checkbox } from "@/shared/ui/Checkbox";

type Props = {
    data: Album;
    clickOnPhoto?: () => void;
    checkboxValue?: boolean;
    mode?: "default" | "edit";
};

const AlbumItem: React.FC<Props> = ({
    data,
    clickOnPhoto,
    checkboxValue,
    mode = "default",
}) => {
    const { imageUrl, title, id, photosCount } = data || {};

    const content = () => {
        return (
            <>
                {imageUrl && (
                    <Image src={imageUrl} alt={`Фото альбома ${title}`} fill />
                )}

                {mode === "edit" && (
                    <Checkbox
                        id={`album_checkbox_${id}`}
                        wrapperClass={styles.albumItemCheckbox}
                        value={checkboxValue}
                    />
                )}
            </>
        );
    };

    return (
        <div className={styles.albumItem}>
            {mode === "edit" ? (
                <div
                    className={styles.albumItemImage}
                    onClick={() => {
                        if (!clickOnPhoto) return;

                        clickOnPhoto();
                    }}
                >
                    {content()}
                </div>
            ) : (
                <Link href={`/albums/${id}`} className={styles.albumItemImage}>
                    {content()}
                </Link>
            )}

            <span className={styles.albumItemInfo}>
                {mode === "edit" ? (
                    <Link
                        href={`/profile/albums/edit/${id}`}
                        className={styles.albumItemNameInner}
                    >
                        {title}

                        <Edit2 />
                    </Link>
                ) : (
                    <Link
                        href={`/albums/${id}`}
                        className={styles.albumItemNameInner}
                    >
                        {title}
                    </Link>
                )}

                <span className={styles.albumItemInfoCount}>
                    {photosCount} фото
                </span>
            </span>
        </div>
    );
};

export default AlbumItem;
