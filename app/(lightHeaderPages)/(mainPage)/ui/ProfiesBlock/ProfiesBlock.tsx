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

import { AdvSearch, ArrowLeft, ArrowRight } from "@/shared/icons";
import { Pro } from "@/shared/ui/Pro";
import { Rating } from "@/shared/ui/Rating";
import { useUserInfo } from "@/features/user";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { useLocation } from "@/shared/context/LocationProvider";

const ProfiesBlock = () => {
    const { location, currentLocation } = useLocation();
    const selectedLocation = currentLocation ?? location;
    const swiperInstance = React.useRef<SwiperClass | null>(null);

    const { getUsers } = useUserInfo();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["usersSearch", selectedLocation],
        queryFn: () =>
            getUsers({
                limit: 10,
                sort: "popularity",
                ...(selectedLocation && {
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                }),
            }),
    });

    const { data: users } = data || {};

    return (
        <section className={styles.profies}>
            <div className={base.container}>
                <div className={shared.sliderBlockInner}>
                    <p className={shared.sliderBlockTitle}>Популярные Профи</p>

                    {isLoading ? (
                        <Preloader page small />
                    ) : isError ? (
                        <NotContent
                            text="Произошла ошибка при загрузке данных"
                            danger
                        />
                    ) : !!users?.length ? (
                        <div className={shared.sliderBlockWrapper}>
                            <button
                                className={cn(
                                    styles.profiesSliderArrow,
                                    styles.prev,
                                )}
                                onClick={() =>
                                    swiperInstance.current?.slidePrev()
                                }
                            >
                                <ArrowLeft />
                            </button>

                            <button
                                className={cn(
                                    styles.profiesSliderArrow,
                                    styles.next,
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
                                {users.map((data) => {
                                    const {
                                        avatarUrl,
                                        firstName,
                                        isPro,
                                        lastName,
                                        location,
                                        proCategories,
                                        id,
                                        distance,
                                        reviews,
                                    } = data || {};
                                    const { place } = location || {};
                                    const { city } = place || {};
                                    const { rating } = reviews || {};

                                    return (
                                        <SwiperSlide
                                            key={data.id}
                                            className={styles.profiesSlide}
                                        >
                                            <Link
                                                href={`/user/${id}`}
                                                className={
                                                    styles.profiesSlideLink
                                                }
                                            >
                                                <span
                                                    className={
                                                        styles.profiesSlideImg
                                                    }
                                                >
                                                    <Image
                                                        src={
                                                            avatarUrl ??
                                                            "/img/placeholder.png"
                                                        }
                                                        alt={`${firstName} ${lastName} аватарка`}
                                                        fill
                                                    />
                                                </span>

                                                <span
                                                    className={
                                                        styles.profiesSlideName
                                                    }
                                                >
                                                    <span>{lastName}</span>

                                                    <span>{firstName}</span>
                                                </span>

                                                <span
                                                    className={
                                                        styles.profiesSlideWrapper
                                                    }
                                                >
                                                    <Rating
                                                        rating={rating || 0}
                                                        className={
                                                            styles.profiesSlideRate
                                                        }
                                                    />

                                                    {isPro && <Pro />}
                                                </span>

                                                {proCategories &&
                                                    !!proCategories.length && (
                                                        <span
                                                            className={
                                                                styles.profiesSlideRole
                                                            }
                                                        >
                                                            {
                                                                proCategories[0]
                                                                    .name
                                                            }
                                                        </span>
                                                    )}

                                                {city && (
                                                    <span
                                                        className={
                                                            styles.profiesSlideLocation
                                                        }
                                                    >
                                                        {city}{" "}
                                                        {distance &&
                                                            `| ${distance} км`}
                                                    </span>
                                                )}
                                            </Link>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    ) : (
                        <NotContent text="На нашем сайте еще нет профи :(" />
                    )}

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
