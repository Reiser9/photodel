"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import styles from "./index.module.scss";
import base from "@/shared/styles/base.module.scss";

import { Facebook, Instagram, Mail, Twitter, Vk } from "@/shared/icons";
import { useUserInfo } from "@/features/user";

const Footer = () => {
    const { getSiteSocials } = useUserInfo();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["siteSocials"],
        queryFn: getSiteSocials,
    });

    return (
        <footer className={styles.footer}>
            <div className={base.container}>
                <div className={styles.footerInner}>
                    <div className={styles.footerItem}>
                        <p className={styles.footerItemTitle}>Сервис</p>

                        <div className={styles.footerItemLinks}>
                            <Link href="/" className={styles.footerItemLink}>
                                О сервисе
                            </Link>

                            <Link href="/" className={styles.footerItemLink}>
                                Правила пользования
                            </Link>

                            <Link href="/" className={styles.footerItemLink}>
                                Политика конфиденциальности
                            </Link>

                            <Link href="/" className={styles.footerItemLink}>
                                Вопросы и ответы
                            </Link>

                            <Link href="/" className={styles.footerItemLink}>
                                Рекламодателям
                            </Link>
                        </div>
                    </div>

                    <div className={styles.footerItem}>
                        <p className={styles.footerItemTitle}>Клиентам</p>

                        <div className={styles.footerItemLinks}>
                            <Link href="/" className={styles.footerItemLink}>
                                Как это работает?
                            </Link>

                            <Link href="/" className={styles.footerItemLink}>
                                Все услуги
                            </Link>

                            <Link href="/" className={styles.footerItemLink}>
                                Безопасность
                            </Link>
                        </div>
                    </div>

                    <div className={styles.footerItem}>
                        <p className={styles.footerItemTitle}>Профи</p>

                        <div className={styles.footerItemLinks}>
                            <Link href="/" className={styles.footerItemLink}>
                                Как это работает?
                            </Link>

                            <Link href="/" className={styles.footerItemLink}>
                                Защита личных данных
                            </Link>

                            <Link href="/" className={styles.footerItemLink}>
                                Регистрация
                            </Link>

                            <Link href="/" className={styles.footerItemLink}>
                                Авторские права
                            </Link>
                        </div>
                    </div>

                    <div className={styles.footerItem}>
                        <p className={styles.footerCopy}>
                            &copy; photodel.ru, 2020-{new Date().getFullYear()}
                        </p>

                        <button className={styles.footerSupport}>
                            <Mail />
                            Обратная связь
                        </button>

                        <div className={styles.footerSocials}>
                            <a
                                href="#"
                                className={styles.footerSocial}
                                target="_blank"
                            >
                                <Vk />
                            </a>

                            <a
                                href="#"
                                className={styles.footerSocial}
                                target="_blank"
                            >
                                <Facebook />
                            </a>

                            <a
                                href="#"
                                className={styles.footerSocial}
                                target="_blank"
                            >
                                <Instagram />
                            </a>

                            <a
                                href="#"
                                className={styles.footerSocial}
                                target="_blank"
                            >
                                <Twitter />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
