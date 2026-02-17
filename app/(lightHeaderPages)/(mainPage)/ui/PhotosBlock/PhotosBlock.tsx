"use client";

import React from "react";
import Link from "next/link";
import cn from "classnames";
import Image from "next/image";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import "swiper/css";
import styles from "./index.module.scss";
import shared from '../index.module.scss';
import base from "@/shared/styles/base.module.scss";

import {
    AdvSearch,
    ArrowLeft,
    ArrowRight,
    Bookmark,
    Comment,
    Heart,
} from "@/shared/icons";

const PhotosBlock = () => {
    const swiperInstance = React.useRef<SwiperClass | null>(null);

    return (
        <section className={styles.photos}>
            <div className={base.container}>
                <div className={shared.sliderBlockInner}>
                    <p className={shared.sliderBlockTitle}>Популярные фотографии</p>

                    <div className={shared.sliderBlockWrapper}>
                        <button
                            className={cn(
                                shared.sliderBlockArrow,
                                shared.prev,
                            )}
                            onClick={() => swiperInstance.current?.slidePrev()}
                        >
                            <ArrowLeft />
                        </button>

                        <button
                            className={cn(
                                shared.sliderBlockArrow,
                                shared.next,
                            )}
                            onClick={() => swiperInstance.current?.slideNext()}
                        >
                            <ArrowRight />
                        </button>

                        <Swiper
                            spaceBetween={24}
                            slidesPerView={4}
                            className={shared.sliderBlockSlider}
                            loop
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
                            <SwiperSlide className={styles.photosSlide}>
                                <div className={styles.photosSlideImg}>
                                    <Image
                                        src="/img/photo1.png"
                                        alt="Изображение"
                                        fill
                                    />
                                </div>

                                <Link
                                    href="/photos"
                                    className={styles.photosSlideInfo}
                                >
                                    <span className={styles.photosSlideStats}>
                                        <span
                                            className={styles.photosSlideStat}
                                        >
                                            <Heart />
                                            57
                                        </span>

                                        <span
                                            className={styles.photosSlideStat}
                                        >
                                            <Comment />
                                            33
                                        </span>

                                        <span
                                            className={styles.photosSlideStat}
                                        >
                                            <Bookmark />
                                            12
                                        </span>
                                    </span>

                                    <span
                                        className={styles.photosSlideAuthorInfo}
                                    >
                                        <span>Любовь</span>

                                        <span>Дубровский Дмитрий</span>
                                    </span>
                                </Link>
                            </SwiperSlide>

                            <SwiperSlide className={styles.photosSlide}>
                                <div className={styles.photosSlideImg}>
                                    <Image
                                        src="/img/photo2.png"
                                        alt="Изображение"
                                        fill
                                    />
                                </div>

                                <Link
                                    href="/photos"
                                    className={styles.photosSlideInfo}
                                >
                                    <span className={styles.photosSlideStats}>
                                        <span
                                            className={styles.photosSlideStat}
                                        >
                                            <Heart />
                                            57
                                        </span>

                                        <span
                                            className={styles.photosSlideStat}
                                        >
                                            <Comment />
                                            33
                                        </span>

                                        <span
                                            className={styles.photosSlideStat}
                                        >
                                            <Bookmark />
                                            12
                                        </span>
                                    </span>

                                    <span
                                        className={styles.photosSlideAuthorInfo}
                                    >
                                        <span>Любовь</span>

                                        <span>Дубровский Дмитрий</span>
                                    </span>
                                </Link>
                            </SwiperSlide>

                            <SwiperSlide className={styles.photosSlide}>
                                <div className={styles.photosSlideImg}>
                                    <Image
                                        src="/img/photo3.png"
                                        alt="Изображение"
                                        fill
                                    />
                                </div>

                                <Link
                                    href="/photos"
                                    className={styles.photosSlideInfo}
                                >
                                    <span className={styles.photosSlideStats}>
                                        <span
                                            className={styles.photosSlideStat}
                                        >
                                            <Heart />
                                            57
                                        </span>

                                        <span
                                            className={styles.photosSlideStat}
                                        >
                                            <Comment />
                                            33
                                        </span>

                                        <span
                                            className={styles.photosSlideStat}
                                        >
                                            <Bookmark />
                                            12
                                        </span>
                                    </span>

                                    <span
                                        className={styles.photosSlideAuthorInfo}
                                    >
                                        <span>Любовь</span>

                                        <span>Дубровский Дмитрий</span>
                                    </span>
                                </Link>
                            </SwiperSlide>

                            <SwiperSlide className={styles.photosSlide}>
                                <div className={styles.photosSlideImg}>
                                    <Image
                                        src="/img/photo4.png"
                                        alt="Изображение"
                                        fill
                                    />
                                </div>

                                <Link
                                    href="/photos"
                                    className={styles.photosSlideInfo}
                                >
                                    <span className={styles.photosSlideStats}>
                                        <span
                                            className={styles.photosSlideStat}
                                        >
                                            <Heart />
                                            57
                                        </span>

                                        <span
                                            className={styles.photosSlideStat}
                                        >
                                            <Comment />
                                            33
                                        </span>

                                        <span
                                            className={styles.photosSlideStat}
                                        >
                                            <Bookmark />
                                            12
                                        </span>
                                    </span>

                                    <span
                                        className={styles.photosSlideAuthorInfo}
                                    >
                                        <span>Любовь</span>

                                        <span>Дубровский Дмитрий</span>
                                    </span>
                                </Link>
                            </SwiperSlide>

                            <SwiperSlide className={styles.photosSlide}>
                                <div className={styles.photosSlideImg}>
                                    <Image
                                        src="/img/photo1.png"
                                        alt="Изображение"
                                        fill
                                    />
                                </div>

                                <Link
                                    href="/photos"
                                    className={styles.photosSlideInfo}
                                >
                                    <span className={styles.photosSlideStats}>
                                        <span
                                            className={styles.photosSlideStat}
                                        >
                                            <Heart />
                                            57
                                        </span>

                                        <span
                                            className={styles.photosSlideStat}
                                        >
                                            <Comment />
                                            33
                                        </span>

                                        <span
                                            className={styles.photosSlideStat}
                                        >
                                            <Bookmark />
                                            12
                                        </span>
                                    </span>

                                    <span
                                        className={styles.photosSlideAuthorInfo}
                                    >
                                        <span>Любовь</span>

                                        <span>Дубровский Дмитрий</span>
                                    </span>
                                </Link>
                            </SwiperSlide>
                        </Swiper>
                    </div>

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
