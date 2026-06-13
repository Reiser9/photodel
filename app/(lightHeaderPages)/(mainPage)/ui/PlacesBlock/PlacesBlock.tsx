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

import { AdvSearch, ArrowLeft, ArrowRight, Heart } from "@/shared/icons";
import { usePlaces } from "@/features/places";
import { NotContent } from "@/shared/ui/NotContent";
import { Preloader } from "@/shared/ui/Preloader";

const PlacesBlock = () => {
    const swiperInstance = React.useRef<SwiperClass | null>(null);

    const { getPlaces } = usePlaces();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["places"],
        queryFn: () =>
            getPlaces({
                limit: 10,
                sort: "popularity",
                isAuth: false
            }),
    });

    const { data: places } = data || {};

    return (
        <section className={styles.places}>
            <div className={base.container}>
                <div className={shared.sliderBlockInner}>
                    <p className={shared.sliderBlockTitle}>
                        Лучшие места для съемок
                    </p>

                    {isLoading ? (
                        <Preloader page small />
                    ) : isError ? (
                        <NotContent
                            text="Произошла ошибка при загрузке данных"
                            danger
                        />
                    ) : !!places?.length ? (
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
                                slidesPerView={5}
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
                                        slidesPerView: 4,
                                        spaceBetween: 20,
                                    },
                                    998: {
                                        slidesPerView: 5,
                                        spaceBetween: 24,
                                    },
                                }}
                            >
                                {places.map((data) => {
                                    const {
                                        preview,
                                        location,
                                        name,
                                        likes,
                                        id,
                                    } = data || {};
                                    const { place } = location || {};
                                    const { city } = place || {};
                                    const { url } = preview || {};
                                    const { count, isLiked } = likes || {};

                                    return (
                                        <SwiperSlide
                                            key={id}
                                            className={styles.placesSlide}
                                        >
                                            <Link
                                                href={`/places/${id}`}
                                                className={
                                                    styles.placesSlideLink
                                                }
                                            >
                                                <span
                                                    className={
                                                        styles.placesSlideImg
                                                    }
                                                >
                                                    <Image
                                                        src={url}
                                                        alt={`${name} место для съемок`}
                                                        fill
                                                    />
                                                </span>

                                                <span
                                                    className={
                                                        styles.placesSlideTitle
                                                    }
                                                >
                                                    {name}
                                                </span>

                                                <span
                                                    className={cn(
                                                        styles.placesSlideLikes,
                                                        {
                                                            [styles.active]:
                                                                isLiked,
                                                        },
                                                    )}
                                                >
                                                    <Heart />
                                                    {count}
                                                </span>

                                                {city && (
                                                    <span
                                                        className={
                                                            styles.placesSlideLocation
                                                        }
                                                    >
                                                        {city}
                                                    </span>
                                                )}
                                            </Link>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    ) : (
                        <NotContent text="На нашем сайте еще нет мест для съемок :(" />
                    )}

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
