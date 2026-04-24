"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import cn from "classnames";

import styles from "./index.module.scss";

import type { Training } from "../model";
import { Date, Edit2, Format, Money } from "@/shared/icons";
import { StatsBlock } from "@/shared/ui/StatsBlock";
import { Checkbox } from "@/shared/ui/Checkbox";
import { formatDate } from "@/shared/utils/formatDate";

type Props = {
    data: Training;
    clickOnPhoto?: () => void;
    checkboxValue?: boolean;
    mode?: "default" | "edit" | "select";
    className?: string;
};

const TrainingItem: React.FC<Props> = ({
    data,
    clickOnPhoto,
    checkboxValue,
    mode = "default",
    className,
}) => {
    const {
        preview,
        id,
        name,
        location,
        user,
        startDate,
        endDate,
        price,
        format,
        likes,
        favorites,
        reviews,
    } = data || {};
    const { url } = preview || {};
    const { place } = location || {};
    const { city } = place || {};
    const { count: likesCount, isLiked } = likes || {};
    const { count: favoritesCount, isFavorite } = favorites || {};
    const { count: commentsCount } = reviews || {};
    const { avatarUrl, firstName, lastName } = user || {};

    const content = () => {
        return (
            <>
                {url && <Image src={url} alt={`${name} - обучение`} fill />}

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
                <Link
                    href={`/trainings/${id}`}
                    className={styles.placesItemImage}
                >
                    {content()}
                </Link>
            )}

            <span className={styles.placesItemInfo}>
                {city && (
                    <span className={styles.placesItemLocation}>
                        <span>{city}</span>
                        {/* <span>5 км</span> */}
                    </span>
                )}

                {mode === "edit" ? (
                    <Link
                        href={`/profile/trainings/edit/${id}`}
                        className={styles.placesItemTitle}
                    >
                        {name}

                        <Edit2 />
                    </Link>
                ) : (
                    <Link
                        href={`/trainings/${id}`}
                        className={styles.placesItemTitle}
                    >
                        {name}
                    </Link>
                )}

                <span className={styles.trainingItemPoints}>
                    <span className={styles.trainingItemPoint}>
                        <Date />
                        {formatDate(`${startDate}`, "DD MMMM")} -{" "}
                        {formatDate(`${endDate}`, "DD MMMM")}
                    </span>

                    {price && (
                        <span className={styles.trainingItemPoint}>
                            <Money />
                            {price}
                        </span>
                    )}

                    {format && (
                        <span className={styles.trainingItemPoint}>
                            <Format />
                            {format}
                        </span>
                    )}
                </span>

                {!!user && (
                    <span className={styles.trainingItemOwner}>
                        <span className={styles.trainingItemOwnerTitle}>
                            Организатор
                        </span>

                        <span className={styles.trainingItemOwnerInfo}>
                            <span className={styles.trainingItemOwnerImage}>
                                <Image
                                    src={avatarUrl ?? "/img/placeholder.png"}
                                    alt={`Аватар ${lastName} ${firstName}`}
                                    fill
                                />
                            </span>

                            <span className={styles.trainingItemOwnerName}>
                                {lastName} {firstName}
                            </span>
                        </span>
                    </span>
                )}

                <StatsBlock
                    isComment
                    comments={commentsCount}
                    favorites={favoritesCount}
                    likes={likesCount}
                    isFavorites={isFavorite}
                    isLiked={isLiked}
                    showLikes
                    showFavorites
                />
            </span>
        </div>
    );
};

export default TrainingItem;
