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

import { AdvSearch, ArrowLeft, ArrowRight, Star } from "@/shared/icons";
import { Pro } from "@/shared/ui/Pro";
import { Rating } from "@/shared/ui/Rating";

const ProfiesBlock = () => {
    const swiperInstance = React.useRef<SwiperClass | null>(null);

    return (
        <section className={styles.profies}>
            <div className={base.container}>
                <div className={shared.sliderBlockInner}>
                    <p className={shared.sliderBlockTitle}>
                        Популярные Профи
                    </p>

                    <div className={shared.sliderBlockWrapper}>
                        <button
                            className={cn(
                                styles.profiesSliderArrow,
                                styles.prev,
                            )}
                            onClick={() => swiperInstance.current?.slidePrev()}
                        >
                            <ArrowLeft />
                        </button>

                        <button
                            className={cn(
                                styles.profiesSliderArrow,
                                styles.next,
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
                                    slidesPerView: 1.5,
                                    spaceBetween: 16,
                                },
                                390: {
                                    slidesPerView: 2,
                                    spaceBetween: 16,
                                },
                                480: {
                                    slidesPerView: 2.5,
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
                            <SwiperSlide className={styles.profiesSlide}>
                                <Link href="/profies" className={styles.profiesSlideLink}>
                                    <span className={styles.profiesSlideImg}>
                                        <Image src="/img/people1.png" alt="Аватар" fill />
                                    </span>

                                    <span className={styles.profiesSlideName}>
                                        <span>Христорождественская</span>

                                        <span>Галина</span>
                                    </span>

                                    <span className={styles.profiesSlideWrapper}>
                                        <Rating rating="4.92" className={styles.profiesSlideRate} />

                                        <Pro />
                                    </span>

                                    <span className={styles.profiesSlideRole}>Фотограф</span>

                                    <span className={styles.profiesSlideLocation}>Санкт-Петербург</span>
                                </Link>
                            </SwiperSlide>

                            <SwiperSlide className={styles.profiesSlide}>
                                <Link href="/profies" className={styles.profiesSlideLink}>
                                    <span className={styles.profiesSlideImg}>
                                        <Image src="/img/people2.png" alt="Аватар" fill />
                                    </span>

                                    <span className={styles.profiesSlideName}>
                                        <span>Сомерхолдер</span>

                                        <span>Йен</span>
                                    </span>

                                    <span className={styles.profiesSlideWrapper}>
                                        <Rating rating="4.92" className={styles.profiesSlideRate} />
                                    </span>

                                    <span className={styles.profiesSlideRole}>Фотограф</span>

                                    <span className={styles.profiesSlideLocation}>Санкт-Петербург</span>
                                </Link>
                            </SwiperSlide>

                            <SwiperSlide className={styles.profiesSlide}>
                                <Link href="/profies" className={styles.profiesSlideLink}>
                                    <span className={styles.profiesSlideImg}>
                                        <Image src="/img/people3.png" alt="Аватар" fill />
                                    </span>

                                    <span className={styles.profiesSlideName}>
                                        <span>Мерзляков</span>

                                        <span>Андрей</span>
                                    </span>

                                    <span className={styles.profiesSlideWrapper}>
                                        <Rating rating="4.92" className={styles.profiesSlideRate} />

                                        <Pro />
                                    </span>

                                    <span className={styles.profiesSlideRole}>Фотограф</span>

                                    <span className={styles.profiesSlideLocation}>Санкт-Петербург</span>
                                </Link>
                            </SwiperSlide>

                            <SwiperSlide className={styles.profiesSlide}>
                                <Link href="/profies" className={styles.profiesSlideLink}>
                                    <span className={styles.profiesSlideImg}>
                                        <Image src="/img/people4.png" alt="Аватар" fill />
                                    </span>

                                    <span className={styles.profiesSlideName}>
                                        <span>Христорождественская</span>
                                        <span>Галина</span>
                                    </span>

                                    <span className={styles.profiesSlideWrapper}>
                                        <Rating rating="4.92" className={styles.profiesSlideRate} />

                                        <Pro />
                                    </span>

                                    <span className={styles.profiesSlideRole}>Фотограф</span>

                                    <span className={styles.profiesSlideLocation}>Санкт-Петербург</span>
                                </Link>
                            </SwiperSlide>

                            <SwiperSlide className={styles.profiesSlide}>
                                <Link href="/profies" className={styles.profiesSlideLink}>
                                    <span className={styles.profiesSlideImg}>
                                        <Image src="/img/people2.png" alt="Аватар" fill />
                                    </span>

                                    <span className={styles.profiesSlideName}>
                                        <span>Христорождественская</span>
                                        <span>Галина</span>
                                    </span>

                                    <span className={styles.profiesSlideWrapper}>
                                        <Rating rating="4.92" className={styles.profiesSlideRate} />

                                        <Pro />
                                    </span>

                                    <span className={styles.profiesSlideRole}>Фотограф</span>

                                    <span className={styles.profiesSlideLocation}>Санкт-Петербург</span>
                                </Link>
                            </SwiperSlide>

                            <SwiperSlide className={styles.profiesSlide}>
                                <Link href="/profies" className={styles.profiesSlideLink}>
                                    <span className={styles.profiesSlideImg}>
                                        <Image src="/img/people1.png" alt="Аватар" fill />
                                    </span>

                                    <span className={styles.profiesSlideName}>
                                        <span>Христорождественская</span>
                                        <span>Галина</span>
                                    </span>

                                    <span className={styles.profiesSlideWrapper}>
                                        <Rating rating="4.92" className={styles.profiesSlideRate} />

                                        <Pro />
                                    </span>

                                    <span className={styles.profiesSlideRole}>Фотограф</span>

                                    <span className={styles.profiesSlideLocation}>Санкт-Петербург</span>
                                </Link>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    <Link href="/profies" className={shared.sliderBlockLink}>
                        <AdvSearch />
                        Расширенный поиск Профи
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProfiesBlock;
