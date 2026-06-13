"use client";

import React from "react";
import Link from "next/link";
import cn from "classnames";
import Image from "next/image";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";

import "swiper/css";
import styles from "./index.module.scss";
import shared from "../index.module.scss";
import base from "@/shared/styles/base.module.scss";

import {
    AdvSearch,
    ArrowLeft,
    ArrowRight,
    Bookmark,
    Comment,
    Heart,
} from "@/shared/icons";
import { usePhotos } from "@/features/photos";
import { NotContent } from "@/shared/ui/NotContent";
import { Preloader } from "@/shared/ui/Preloader";

const PhotosBlock = () => {
    const swiperInstance = React.useRef<SwiperClass | null>(null);

    const { getPhotos } = usePhotos();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["photos"],
        queryFn: () =>
            getPhotos({
                limit: 10,
                sort: "popularity",
                isAuth: false
            }),
    });

    const { data: photos } = data || {};

    return (
        <section className={styles.photos}>
            <div className={base.container}>
                <div className={shared.sliderBlockInner}>
                    <p className={shared.sliderBlockTitle}>
                        Популярные фотографии
                    </p>

                    {isLoading ? (
                        <Preloader page small />
                    ) : isError ? (
                        <NotContent
                            text="Произошла ошибка при загрузке данных"
                            danger
                        />
                    ) : !!photos?.length ? (
                        <div className={shared.sliderBlockWrapper}>
                            <button
                                className={cn(
                                    shared.sliderBlockArrow,
                                    shared.prev,
                                )}
                                onClick={() =>
                                    swiperInstance.current?.slidePrev()
                                }
                            >
                                <ArrowLeft />
                            </button>

                            <button
                                className={cn(
                                    shared.sliderBlockArrow,
                                    shared.next,
                                )}
                                onClick={() =>
                                    swiperInstance.current?.slideNext()
                                }
                            >
                                <ArrowRight />
                            </button>

                            <Swiper
                                spaceBetween={24}
                                slidesPerView={4}
                                className={shared.sliderBlockSlider}
                                onSwiper={(swiper) => {
                                    swiperInstance.current = swiper;
                                }}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1.3,
                                        spaceBetween: 16,
                                    },
                                    480: {
                                        slidesPerView: 2,
                                        spaceBetween: 16,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                        spaceBetween: 20,
                                    },
                                    998: {
                                        slidesPerView: 4,
                                        spaceBetween: 24,
                                    },
                                }}
                            >
                                {photos.map((data) => {
                                    const {
                                        imageUrl,
                                        name,
                                        user,
                                        likes,
                                        id,
                                        favorites,
                                        reviews
                                    } = data || {};
                                    const { count: likesCount, isLiked } = likes || {};
                                    const { count: favoritesCount, isFavorite } = favorites || {};
                                    const { count: reviewsCount } = reviews || {};

                                    const { firstName, lastName } = user || {};

                                    return (
                                        <SwiperSlide
                                            key={id}
                                            className={styles.photosSlide}
                                        >
                                            <div
                                                className={
                                                    styles.photosSlideImg
                                                }
                                            >
                                                {imageUrl && <Image
                                                    src={imageUrl}
                                                    alt={`${name} фотография`}
                                                    fill
                                                />}
                                            </div>

                                            <Link
                                                href={`/photos/${id}`}
                                                className={
                                                    styles.photosSlideInfo
                                                }
                                            >
                                                <span
                                                    className={
                                                        styles.photosSlideStats
                                                    }
                                                >
                                                    <span
                                                        className={cn(styles.photosSlideStat, styles.like, {
                                                            [styles.active]: isLiked
                                                        })}
                                                    >
                                                        <Heart />
                                                        {likesCount}
                                                    </span>

                                                    <span
                                                        className={
                                                            styles.photosSlideStat
                                                        }
                                                    >
                                                        <Comment />
                                                        {reviewsCount}
                                                    </span>

                                                    <span
                                                        className={cn(styles.photosSlideStat, styles.favorite, {
                                                            [styles.active]: isFavorite
                                                        })}
                                                    >
                                                        <Bookmark />
                                                        {favoritesCount}
                                                    </span>
                                                </span>

                                                <span
                                                    className={
                                                        styles.photosSlideAuthorInfo
                                                    }
                                                >
                                                    <span>{name}</span>

                                                    <span>
                                                        {lastName} {firstName}
                                                    </span>
                                                </span>
                                            </Link>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    ) : (
                        <NotContent text="На нашем сайте еще нет фото :(" />
                    )}

                    <Link href="/photos" className={shared.sliderBlockLink}>
                        <AdvSearch />
                        Расширенный поиск фотографий
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PhotosBlock;
