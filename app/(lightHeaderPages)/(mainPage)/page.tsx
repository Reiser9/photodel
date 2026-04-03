"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./index.module.scss";
import base from "@/shared/styles/base.module.scss";

import { Profile, Search } from "@/shared/icons";
import { InfoBlock } from "./ui/InfoBlock";
import { PhotosBlock } from "./ui/PhotosBlock";
import { PlacesBlock } from "./ui/PlacesBlock";
import { ProfiesBlock } from "./ui/ProfiesBlock";
import { LastComments } from "./ui/LastComments";

import { Button } from "@/shared/ui/Button";
import { useAppSelector } from "@/shared/hooks/useRedux";
import { useAuthContext } from "@/shared/context/AuthProvider";

const MainPage = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth);

    const [search, setSearch] = React.useState("");
    const { setRegisterModal } = useAuthContext();

    const router = useRouter();

    const searchProfi = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.replace(`/profies?search=${search}`);
    };

    return (
        <>
            <section className={styles.main}>
                <div className={styles.mainImg}>
                    <Image src="/img/main-img.png" fill alt="Фото дня" />
                </div>

                <div className={base.container}>
                    <div className={styles.mainInner}>
                        <h1 className={styles.mainTitle}>
                            Поиск фотопрофессионалов рядом с Вами
                        </h1>

                        <p className={styles.mainText}>
                            Найдите фотографа, модель или студию для съемок
                        </p>

                        <form
                            onSubmit={searchProfi}
                            className={styles.mainSearchInner}
                        >
                            <input
                                className={styles.mainSearch}
                                placeholder="Начать поиск"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <Search />
                        </form>
                    </div>
                </div>

                <div className={styles.mainAuthorInner}>
                    <p className={styles.mainImageTitle}>Фото дня</p>

                    <p className={styles.mainImgName}>У горного хребта</p>

                    <Link href="/" className={styles.mainAuthor}>
                        <Profile />
                        Смольникова Алена
                    </Link>
                </div>
            </section>

            <ProfiesBlock />

            <PlacesBlock />

            <PhotosBlock />

            <LastComments />

            <InfoBlock />

            <section className={styles.banner}>
                <div className={styles.bannerImg}>
                    <Image src="/img/banner.png" alt="Баннер" fill />
                </div>

                <div className={base.container}>
                    <div className={styles.bannerInner}>
                        <h2 className={styles.bannerTitle}>
                            Вы отличный фотограф или профессиональная модель?
                        </h2>

                        <p className={styles.bannerText}>
                            Зарегистрируйтесь на Фотодел  и начните получать
                            заказы прямо сейчас!
                        </p>

                        {!isAuth && (
                            <Button
                                auto
                                className={styles.bannerButton}
                                onClick={() => setRegisterModal(true)}
                            >
                                Зарегистрироваться
                            </Button>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default MainPage;
