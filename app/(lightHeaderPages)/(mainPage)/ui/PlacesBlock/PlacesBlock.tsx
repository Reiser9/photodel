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

import { AdvSearch, ArrowLeft, ArrowRight, Heart } from "@/shared/icons";

const PlacesBlock = () => {
    const swiperInstance = React.useRef<SwiperClass | null>(null);

    return (
        <section className={styles.places}>
            <div className={base.container}>
                <div className={shared.sliderBlockInner}>
                    <p className={shared.sliderBlockTitle}>
                        Лучшие места для съемок
                    </p>

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
                            slidesPerView={5}
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
                                    slidesPerView: 4,
                                    spaceBetween: 20,
                                },
                                998: {
                                    slidesPerView: 5,
                                    spaceBetween: 24,
                                },
                            }}
                        >
                            <SwiperSlide className={styles.placesSlide}>
                                <Link href="/places" className={styles.placesSlideLink}>
                                    <span className={styles.placesSlideImg}>
                                        <Image src="/img/photo1.png" alt="Фото" fill />
                                    </span>

                                    <span className={styles.placesSlideTitle}>
                                        Карельские закаты
                                    </span>

                                    <span className={styles.placesSlideLikes}>
                                        <Heart />
                                        675
                                    </span>

                                    <span className={styles.placesSlideLocation}>Петрозаводск</span>
                                </Link>
                            </SwiperSlide>

                            <SwiperSlide className={styles.placesSlide}>
                                <Link href="/places" className={styles.placesSlideLink}>
                                    <span className={styles.placesSlideImg}>
                                        <Image src="/img/photo2.png" alt="Фото" fill />
                                    </span>

                                    <span className={styles.placesSlideTitle}>
                                        На гребне волны
                                    </span>

                                    <span className={styles.placesSlideLikes}>
                                        <Heart />
                                        590
                                    </span>

                                    <span className={styles.placesSlideLocation}>Майорка</span>
                                </Link>
                            </SwiperSlide>

                            <SwiperSlide className={styles.placesSlide}>
                                <Link href="/places" className={styles.placesSlideLink}>
                                    <span className={styles.placesSlideImg}>
                                        <Image src="/img/photo1.png" alt="Фото" fill />
                                    </span>

                                    <span className={styles.placesSlideTitle}>
                                        Сухумские вечера
                                    </span>

                                    <span className={styles.placesSlideLikes}>
                                        <Heart />
                                        389
                                    </span>

                                    <span className={styles.placesSlideLocation}>Сухум</span>
                                </Link>
                            </SwiperSlide>

                            <SwiperSlide className={styles.placesSlide}>
                                <Link href="/places" className={styles.placesSlideLink}>
                                    <span className={styles.placesSlideImg}>
                                        <Image src="/img/photo3.png" alt="Фото" fill />
                                    </span>

                                    <span className={styles.placesSlideTitle}>
                                        Прогулка по Питеру
                                    </span>

                                    <span className={styles.placesSlideLikes}>
                                        <Heart />
                                        464
                                    </span>

                                    <span className={styles.placesSlideLocation}>Санкт-Петербург</span>
                                </Link>
                            </SwiperSlide>

                            <SwiperSlide className={styles.placesSlide}>
                                <Link href="/places" className={styles.placesSlideLink}>
                                    <span className={styles.placesSlideImg}>
                                        <Image src="/img/photo4.png" alt="Фото" fill />
                                    </span>

                                    <span className={styles.placesSlideTitle}>
                                        Зимний Байкал
                                    </span>

                                    <span className={styles.placesSlideLikes}>
                                        <Heart />
                                        12
                                    </span>

                                    <span className={styles.placesSlideLocation}>Иркутск</span>
                                </Link>
                            </SwiperSlide>

                            <SwiperSlide className={styles.placesSlide}>
                                <Link href="/places" className={styles.placesSlideLink}>
                                    <span className={styles.placesSlideImg}>
                                        <Image src="/img/photo1.png" alt="Фото" fill />
                                    </span>

                                    <span className={styles.placesSlideTitle}>
                                        Карельские закаты
                                    </span>

                                    <span className={styles.placesSlideLikes}>
                                        <Heart />
                                        675
                                    </span>

                                    <span className={styles.placesSlideLocation}>Петрозаводск</span>
                                </Link>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    <Link href="/places" className={shared.sliderBlockLink}>
                        <AdvSearch />
                        Расширенный поиск Мест для съемки
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PlacesBlock;
