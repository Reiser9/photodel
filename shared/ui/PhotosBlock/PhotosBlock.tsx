import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./index.module.scss";

import type { Photo } from "@/entities/photos/photo";
import { Checkbox } from "../Checkbox";
import { CirclePlus, Edit2 } from "@/shared/icons";
import { Select } from "../Select";
import { StatsBlock } from "../StatsBlock";

type Props = {
    count?: number | string;
    photos: Photo[];
};

const PhotosBlock: React.FC<Props> = ({ count, photos }) => {
    const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
    const [action, setAction] = React.useState<"delete" | null>(null);

    const selectPhoto = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds((prev) => prev.filter((item) => item != id));
        } else {
            setSelectedIds((prev) => [...prev, id]);
        }
    };

    const isAllSelected = React.useMemo(() => {
        if (photos.length === 0) return false;

        return photos.every((photo) => selectedIds.includes(photo.id));
    }, [photos, selectedIds]);

    const selectAllPhotos = () => {
        if (isAllSelected) {
            setSelectedIds([]);
        } else {
            const allIds = photos.map((photo) => photo.id);
            setSelectedIds(allIds);
        }
    };

    return (
        <>
            {!!count && (
                <div className={styles.photoTop}>
                    <div className={styles.photoTopWrap}>
                        <p className={styles.photoTopCount}>
                            Всего: <span>{count}</span>
                        </p>

                        <Checkbox
                            label="Выбрать все"
                            id="photos_all"
                            auto
                            value={isAllSelected}
                            onChangeHandler={selectAllPhotos}
                        />
                    </div>

                    <div className={styles.photoTopWrap}>
                        <Link
                            href="/profile/photos/add"
                            className={styles.addLink}
                        >
                            <CirclePlus />
                            Добавить фото
                        </Link>

                        <Select
                            wrapperClass={styles.actionSelect}
                            placeholder="Выберите действие"
                            value={action}
                            setValue={setAction}
                            options={[
                                {
                                    label: "Удалить",
                                    value: "delete",
                                },
                            ]}
                        />
                    </div>
                </div>
            )}

            <div className={styles.photoProfileItems}>
                {photos.map((data) => {
                    const { image, name, id } = data || {};

                    return (
                        <div key={data.id} className={styles.photoProfileItem}>
                            <div
                                className={styles.photoProfileItemImage}
                                onClick={() => selectPhoto(id)}
                            >
                                {image && (
                                    <Image
                                        src={image}
                                        alt={`Изображение ${name}`}
                                        fill
                                    />
                                )}

                                <Checkbox
                                    id={`photo_checkbox_${id}`}
                                    wrapperClass={
                                        styles.photoProfileItemCheckbox
                                    }
                                    value={selectedIds.includes(id)}
                                />
                            </div>

                            <div className={styles.photoProfileItemInfo}>
                                <Link
                                    href="/"
                                    className={styles.photoProfileItemNameInner}
                                >
                                    {name}

                                    <Edit2 />
                                </Link>

                                <StatsBlock
                                    likes={675}
                                    isLiked
                                    favorites={567}
                                    isFavorites
                                    comments={346}
                                    className={styles.photoProfileItemStats}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* <div className={styles.photoItems}>
                {photos.map((data, id) => (
                    <Link
                        key={id}
                        href={`/user/photos/${data.id}`}
                        className={styles.photoItem}
                    >
                        <Image
                            src={data.image}
                            alt={`Фотография ${data.name}`}
                            fill
                        />
                    </Link>
                ))}
            </div> */}
        </>
    );
};

export default PhotosBlock;
