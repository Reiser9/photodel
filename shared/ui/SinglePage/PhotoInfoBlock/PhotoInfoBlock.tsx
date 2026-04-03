import React from "react";
import Image from "next/image";
import cn from "classnames";
import parse from "html-react-parser";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import "swiper/css";
import styles from "./index.module.scss";

import {
    ArrowLeft,
    ArrowRight,
    Bookmark2,
    Comment,
    Eye,
    Heart,
} from "@/shared/icons";
import { useAppSelector } from "@/shared/hooks/useRedux";
import { useAuthContext } from "@/shared/context/AuthProvider";

type Props = {
    image?: string;
    isCarousel?: boolean;
    slides?: { id: number; key: string; url: string }[];
    views: string | number;
    isLike?: boolean;
    likes: string | number;
    likeCallback?: () => void;
    comments: string | number;
    isFavorite?: boolean;
    favorites: string | number;
    favoriteCallback?: () => void;
    date: string;
    title: string;
    text?: string;
};

const PhotoInfoBlock: React.FC<Props> = ({
    image,
    isCarousel = false,
    slides,
    comments,
    isFavorite,
    favorites,
    favoriteCallback,
    isLike,
    likes,
    likeCallback,
    views,
    date,
    title,
    text,
}) => {
    const isAuth = useAppSelector((state) => state.user.isAuth);

    const { setLoginModal } = useAuthContext();

    const swiperInstance = React.useRef<SwiperClass | null>(null);

    return (
        <>
            <div className={styles.photoByIdImageInner}>
                {isCarousel ? (
                    <>
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={1}
                            onSwiper={(swiper) => {
                                swiperInstance.current = swiper;
                            }}
                            onSlideChange={(swiper) =>
                                (swiperInstance.current = swiper)
                            }
                            className={styles.photoByIdSlider}
                        >
                            {slides?.map((data) => (
                                <SwiperSlide
                                    key={data.id}
                                    className={styles.photoByIdSlide}
                                >
                                    <Image
                                        src={data.url}
                                        alt="Изображение"
                                        fill
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <button
                            className={cn(styles.sliderBlockArrow, styles.prev)}
                            onClick={() => swiperInstance.current?.slidePrev()}
                        >
                            <ArrowLeft />
                        </button>

                        <button
                            className={cn(styles.sliderBlockArrow, styles.next)}
                            onClick={() => swiperInstance.current?.slideNext()}
                        >
                            <ArrowRight />
                        </button>
                    </>
                ) : (
                    image && <Image src={image} alt="Изображение" fill />
                )}
            </div>

            <div className={styles.photoByIdActions}>
                <div className={styles.photoByIdActionsContent}>
                    <p className={styles.photoByIdAction} title="Просмотры">
                        <Eye />
                        {views}
                    </p>

                    <button
                        className={cn(styles.photoByIdAction, styles.like, {
                            [styles.active]: isLike,
                        })}
                        onClick={
                            isAuth ? likeCallback : () => setLoginModal(true)
                        }
                    >
                        <Heart />
                        {likes}
                    </button>

                    <p className={cn(styles.photoByIdAction, styles.comment)}>
                        <Comment />
                        {comments}
                    </p>

                    <button
                        className={cn(styles.photoByIdAction, styles.favorite, {
                            [styles.active]: isFavorite,
                        })}
                        onClick={
                            isAuth
                                ? favoriteCallback
                                : () => setLoginModal(true)
                        }
                    >
                        <Bookmark2 />
                        {favorites}
                    </button>
                </div>

                <p className={styles.photoByIdDate}>{date}</p>
            </div>

            <div className={styles.photoByIdTextInner}>
                <p className={styles.photoByIdTextTitle}>{title}</p>

                {text && (
                    <div className={styles.photoByIdTextDescription}>
                        {parse(text)}
                    </div>
                )}
            </div>
        </>
    );
};

export default PhotoInfoBlock;
