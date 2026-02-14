import React from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./index.module.scss";
import base from "@/shared/styles/base.module.scss";

import { AdvSearch, Profile, Search } from "@/shared/icons";
import { InfoBlock } from "./ui/InfoBlock";
import { Button } from "@/shared/ui/Button";

const MainPage = () => {
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

                        <div className={styles.mainSearchInner}>
                            <input
                                className={styles.mainSearch}
                                placeholder="Начать поиск"
                            />

                            <Search />
                        </div>
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

            <section className={styles.profi}>
                <div className={base.container}>
                    <div className={styles.profiInner}>
                        <div className={styles.profiTop}>
                            <div className={styles.profiTitleInner}>
                                <p className={styles.profiTitle}>
                                    Популярные Профи
                                </p>
                            </div>
                        </div>

                        <Link href="/" className={styles.profiLink}>
                            <AdvSearch />
                            Расширенный поиск Профи
                        </Link>
                    </div>
                </div>
            </section>

            <section className={styles.place}>
                <div className={base.container}>
                    <div className={styles.profiInner}>
                        <div className={styles.profiTop}>
                            <div className={styles.profiTitleInner}>
                                <p className={styles.profiTitle}>
                                    Лучшие места для съемок
                                </p>
                            </div>
                        </div>

                        <Link href="/" className={styles.profiLink}>
                            <AdvSearch />
                            Расширенный поиск Мест для съемки
                        </Link>
                    </div>
                </div>
            </section>

            <section className={styles.profi}>
                <div className={base.container}>
                    <div className={styles.profiInner}>
                        <p className={styles.photoTitle}>
                            Популярные фотографии
                        </p>

                        <Link href="/" className={styles.profiLink}>
                            <AdvSearch />
                            Расширенный поиск фотографий
                        </Link>
                    </div>
                </div>
            </section>

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

                        <Button classNames={styles.bannerButton}>
                            Зарегистрироваться
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MainPage;
