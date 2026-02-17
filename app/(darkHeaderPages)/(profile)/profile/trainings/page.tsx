import React from "react";
import Link from "next/link";
import Image from "next/image";
import cn from 'classnames';

import styles from "./index.module.scss";

import { Bookmark2, Comment, Date, Format, Heart, Money } from "@/shared/icons";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { Rating } from "@/shared/ui/Rating";
import { Tabs } from "@/shared/ui/Tabs";
import { StatsBlock } from "@/shared/ui/StatsBlock";

const ProfileTrainingsPage = () => {
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

            <Tabs
                tabs={[{ name: "Обучение" }]}
                className={styles.placesTabs}
            />

            <div className={styles.placesContent}>
                <p className={styles.placesCount}>
                    Всего: <span>3</span>
                </p>

                <div className={styles.placesItems}>
                    <Link
                        href="/profile/trainings/1"
                        className={styles.placesItem}
                    >
                        <span className={styles.placesItemImage}>
                            <Image
                                src="/img/photo5.png"
                                alt="Фото места для съемки"
                                fill
                            />
                        </span>

                        <span className={styles.placesItemInfo}>
                            <span className={styles.placesItemLocation}>
                                <span>Москва</span>
                                <span>5 км</span>
                            </span>

                            <span className={styles.placesItemTitle}>
                                Мастер-класс по черно-белой фотографии
                            </span>

                            <span className={styles.trainingItemPoints}>
                                <span className={styles.trainingItemPoint}>
                                    <Date />
                                    20 мар - 23 мар
                                </span>
                                
                                <span className={styles.trainingItemPoint}>
                                    <Money />
                                    10 000 руб.
                                </span>

                                <span className={styles.trainingItemPoint}>
                                    <Format />
                                    Онлайн
                                </span>
                            </span>

                            <span className={styles.trainingItemOwner}>
                                <span className={styles.trainingItemOwnerTitle}>Организатор</span>

                                <span className={styles.trainingItemOwnerInfo}>
                                    <span className={styles.trainingItemOwnerImage}>
                                        <Image src="/img/people1.png" alt="Фото" fill />
                                    </span>

                                    <span className={styles.trainingItemOwnerName}>Христорождественская Галина</span>
                                </span>
                            </span>

                            <StatsBlock comments={12} favorites={422} likes={63} isFavorites isLiked />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfileTrainingsPage;
