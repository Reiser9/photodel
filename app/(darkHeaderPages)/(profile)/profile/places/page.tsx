"use client";

import React from "react";
import cn from 'classnames';
import Image from "next/image";
import Link from "next/link";

import styles from "./index.module.scss";

import { Bookmark2, Comment, Heart } from "@/shared/icons";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { Rating } from "@/shared/ui/Rating";
import { Tabs } from "@/shared/ui/Tabs";
import { StatsBlock } from "@/shared/ui/StatsBlock";

const ProfilePlacesPage = () => {
    return (
        <div className={styles.places}>
            <div className={styles.placesTop}>
                <UserInfoBlock
                    image="/img/people1.png"
                    name="Иванов"
                    surname="Александр"
                    id={1}
                    isPro
                    size="medium"
                />

                <Rating rating="4.92" />
            </div>

            <Tabs tabs={[{name: "Места для съемок"}]} className={styles.placesTabs} />

            <div className={styles.placesContent}>
                <p className={styles.placesCount}>Всего: <span>3</span></p>

                <div className={styles.placesItems}>
                    <Link href="/profile/places/1" className={styles.placesItem}>
                        <span className={styles.placesItemImage}>
                            <Image src="/img/photo4.png" alt="Фото места для съемки" fill />
                        </span>

                        <span className={styles.placesItemInfo}>
                            <span className={styles.placesItemLocation}>
                                <span>Москва</span>
                                <span>5 км</span>
                            </span>

                            <span className={styles.placesItemTitle}>Вид на мост</span>

                            <StatsBlock comments={12} favorites={422} likes={63} isFavorites isLiked />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfilePlacesPage;
