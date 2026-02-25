import React from "react";
import cn from "classnames";

import styles from "./index.module.scss";
import { Checkbox } from "@/shared/ui/Checkbox";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { Comment2, Star, Warn } from "@/shared/icons";
import { RatingReview } from "@/shared/ui/Rating";
import Image from "next/image";

const ReviewsPage = () => {
    return (
        <>
            <div className={styles.reviewsTop}>
                <p className={styles.reviewsCount}>
                    Всего: <span>2</span>
                </p>

                <Checkbox label="Только с фото" id="with_photo" auto />
            </div>

            <div className={styles.reviewsItems}>
                <div className={styles.reviewsItem}>
                    <div className={styles.reviewsItemTop}>
                        <UserInfoBlock
                            name="Марианна"
                            surname="Родионова"
                            image="/img/people1.png"
                            isPro
                            status="Сегодня 20:20"
                            id="1"
                        />

                        <RatingReview rating={3} />
                    </div>

                    <div className={styles.reviewsItemText}>
                        <p>
                            Если вы в поисках фотографа на свадьбу, то вам к
                            Алексу!! Алекс, спасибо огромное за невероятно
                            красивые, яркие фотографии, которые останутся с нами
                            до конца жизни! Спасибо за память об этом важном
                            дне! Мы, пока смотрели, всё время улыбались и
                            восхищались качеством, яркостью и красотой
                            фотографий! Кирилл тоже очень доволен! Мы счастливы!
                            С тобой было нереально комфортно, легко и приятно на
                            протяжении этих 5 часов!
                        </p>
                    </div>

                    <div className={styles.reviewsPhotos}>
                        <div className={styles.reviewsPhoto}>
                            <Image src="/img/photo1.png" alt="Фото" fill />
                        </div>

                        <div className={styles.reviewsPhoto}>
                            <Image src="/img/photo2.png" alt="Фото" fill />
                        </div>

                        <div className={styles.reviewsPhoto}>
                            <Image src="/img/photo3.png" alt="Фото" fill />
                        </div>

                        <div className={styles.reviewsPhoto}>
                            <Image src="/img/photo4.png" alt="Фото" fill />
                        </div>

                        <div className={styles.reviewsPhoto}>
                            <Image src="/img/photo5.png" alt="Фото" fill />

                            <div className={styles.reviewsPhotoMore}>+5 фото</div>
                        </div>
                    </div>

                    <div className={styles.reviewsItemButtons}>
                        <button className={styles.reviewsItemButton}>
                            <Comment2 />
                            Прокомментрировать
                        </button>

                        <button
                            className={cn(
                                styles.reviewsItemButton,
                                styles.danger,
                            )}
                        >
                            <Warn />
                            Пожаловаться
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReviewsPage;
