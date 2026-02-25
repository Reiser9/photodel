import React from "react";
import cn from "classnames";

import styles from "../index.module.scss";

import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { RatingReview } from "@/shared/ui/Rating";
import { Edit2, Remove } from "@/shared/icons";

const ReviewsMePage = () => {
    return (
        <>
            <p className={styles.reviewsCount}>
                Всего: <span>2</span>
            </p>

            <div className={styles.reviewsItems}>
                <div className={styles.reviewsItem}>
                    <div className={styles.reviewsItemStatus}>
                        <p className={styles.reviewsItemStatusTitle}>На модерации</p>
                    </div>

                    <div className={cn(styles.reviewsItemStatus, styles.error)}>
                        <p className={styles.reviewsItemStatusTitle}>Отклонен</p>

                        <p className={styles.reviewsItemStatusText}>
                            В отзыве недостаточно информации о вашем опыте обращения в магазин. Пожалуйста, расскажите подробнее: как вы выбирали товар, как заказывали, обращались ли вы в магазин с вопросами после покупки товара — и насколько его сотрудники были готовы вам помочь. Тогда мы сможем опубликовать ваш отзыв.
                        </p>
                    </div>

                    <div className={styles.reviewsItemTo}>
                        <p className={styles.reviewsItemToTitle}>
                            Отзыв пользователю
                        </p>

                        <UserInfoBlock
                            name="Марианна"
                            surname="Родионова"
                            image="/img/people1.png"
                            isPro
                            id="1"
                        />
                    </div>

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

                    <div className={styles.reviewsItemButtons}>
                        <button className={styles.reviewsItemButton}>
                            <Edit2 />
                            Редактировать
                        </button>

                        <button
                            className={cn(
                                styles.reviewsItemButton,
                                styles.danger,
                            )}
                        >
                            <Remove />
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReviewsMePage;
