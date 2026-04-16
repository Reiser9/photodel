import React from "react";
import Image from "next/image";
import parse from "html-react-parser";

import styles from "./index.module.scss";

import type { Review } from "../model";
import { RatingReview } from "@/shared/ui/Rating";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { formatDate } from "@/shared/utils/formatDate";

type Props = {
    data: Review;
    actions?: React.ReactNode;
    topBlock?: React.ReactNode;
};

const ReviewItem: React.FC<Props> = ({ data, actions, topBlock }) => {
    const { content, photos, rating, user, createdAt } = data || {};
    const { avatarUrl, firstName, lastName, id, isPro } = user || {};

    return (
        <div className={styles.reviewsItem}>
            {topBlock}

            <div className={styles.reviewsItemTop}>
                <UserInfoBlock
                    name={firstName}
                    surname={lastName}
                    image={avatarUrl}
                    isPro={isPro}
                    status={formatDate(createdAt)}
                    id={id}
                />

                <RatingReview rating={rating} />
            </div>

            <div className={styles.reviewsItemText}>{parse(content)}</div>

            {photos && !!photos.length && (
                <div className={styles.reviewsPhotos}>
                    {photos.map((data) => (
                        <div key={data.id} className={styles.reviewsPhoto}>
                            <Image src={data.url} alt="Фото" fill />
                        </div>
                    ))}

                    {/* <div className={styles.reviewsPhoto}>
                        <Image src="/img/photo5.png" alt="Фото" fill />

                        <div className={styles.reviewsPhotoMore}>+5 фото</div>
                    </div> */}
                </div>
            )}

            {actions}
            {/* <div className={styles.reviewsItemButtons}>
                <button className={styles.reviewsItemButton}>
                    <Comment2 />
                    Прокомментрировать
                </button>

                <button className={cn(styles.reviewsItemButton, styles.danger)}>
                    <Warn />
                    Пожаловаться
                </button>
            </div> */}
        </div>
    );
};

export default ReviewItem;
