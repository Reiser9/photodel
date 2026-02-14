"use client";

import React from "react";
import cn from "classnames";
import Link from "next/link";

import styles from "./index.module.scss";
import base from "@/shared/styles/base.module.scss";

import {
    ArrowDown,
    Camera,
    Close,
    Menu,
    Moon,
    Pin,
    Profile,
    Sun,
} from "@/shared/icons";
import { useThemeContext } from "@/shared/context/ThemeProvider";

type Props = {
    light?: boolean;
};

const Header: React.FC<Props> = ({ light = false }) => {
    const [menuIsOpen, setMenuIsOpen] = React.useState(false);

    const { theme, toggleTheme, chooseTheme } = useThemeContext();

    return (
        <>
            <header
                className={cn(styles.header, {
                    [styles.light]: light,
                })}
            >
                <div className={styles.headerTop}>
                    <div className={base.container}>
                        <div className={styles.headerTopInner}>
                            <button
                                className={styles.headerMenuButton}
                                onClick={() => setMenuIsOpen((prev) => !prev)}
                            >
                                <Menu />
                            </button>

                            <div className={styles.headerTopWrapper}>
                                <button className={styles.headerLocation}>
                                    <Pin />

                                    <span className={styles.headerCity}>
                                        Москва
                                    </span>

                                    <ArrowDown />
                                </button>

                                <div className={styles.headerTheme}>
                                    <button
                                        className={cn(styles.headerThemeName, {
                                            [styles.active]: theme === "dark",
                                        })}
                                        onClick={() => chooseTheme("dark")}
                                    >
                                        Темная
                                    </button>

                                    <button
                                        className={styles.headerThemeSwitch}
                                        onClick={toggleTheme}
                                    >
                                        <span
                                            className={cn(
                                                styles.headerThemeSwitchIndicator,
                                                {
                                                    [styles.dark]:
                                                        theme === "dark",
                                                },
                                            )}
                                        >
                                            <Sun />
                                            <Moon />
                                        </span>
                                    </button>

                                    <button
                                        className={cn(styles.headerThemeName, {
                                            [styles.active]: theme === "light",
                                        })}
                                        onClick={() => chooseTheme("light")}
                                    >
                                        Светлая
                                    </button>
                                </div>
                            </div>

                            <Link
                                href="/"
                                className={cn(styles.headerLogo, styles.mobile)}
                            >
                                <Camera />
                                Фотодел
                            </Link>

                            <button className={styles.headerProfile}>
                                <Profile />
                            </button>
                        </div>
                    </div>
                </div>

                <div className={styles.headerBottom}>
                    <div className={base.container}>
                        <div className={styles.headerBottomInner}>
                            <Link href="/" className={styles.headerLogo}>
                                <Camera />
                                Фотодел
                            </Link>

                            <nav className={styles.headerNav}>
                                <Link href="/profies" className={styles.headerNavLink}>
                                    Профи рядом
                                </Link>

                                <Link href="/places" className={styles.headerNavLink}>
                                    Места для съемок
                                </Link>

                                <Link href="/photos" className={styles.headerNavLink}>
                                    Фотографии
                                </Link>

                                <Link href="/trainings" className={styles.headerNavLink}>
                                    Обучение
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

            <div
                className={cn(styles.mobileMenu, {
                    [styles.active]: menuIsOpen,
                })}
                onClick={() => setMenuIsOpen(false)}
            >
                <div
                    className={styles.mobileMenuContent}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className={styles.mobileMenuClose}
                        onClick={() => setMenuIsOpen(false)}
                    >
                        <Close />
                    </button>

                    <nav className={styles.headerNav}>
                        <Link href="/" className={styles.headerNavLink} onClick={() => setMenuIsOpen(false)}>
                            Профи рядом
                        </Link>

                        <Link href="/" className={styles.headerNavLink} onClick={() => setMenuIsOpen(false)}>
                            Места для съемок
                        </Link>

                        <Link href="/" className={styles.headerNavLink} onClick={() => setMenuIsOpen(false)}>
                            Фотографии
                        </Link>

                        <Link href="/" className={styles.headerNavLink} onClick={() => setMenuIsOpen(false)}>
                            Обучение
                        </Link>
                    </nav>

                    <button className={styles.headerLocation}>
                        <Pin />

                        <span className={styles.headerCity}>
                            Москва
                        </span>

                        <ArrowDown />
                    </button>

                    <div className={styles.headerTheme}>
                        <button
                            className={cn(styles.headerThemeName, {
                                [styles.active]: theme === "dark",
                            })}
                            onClick={() => chooseTheme("dark")}
                        >
                            Темная
                        </button>

                        <button
                            className={styles.headerThemeSwitch}
                            onClick={toggleTheme}
                        >
                            <span
                                className={cn(
                                    styles.headerThemeSwitchIndicator,
                                    {
                                        [styles.dark]:
                                            theme === "dark",
                                    },
                                )}
                            >
                                <Sun />
                                <Moon />
                            </span>
                        </button>

                        <button
                            className={cn(styles.headerThemeName, {
                                [styles.active]: theme === "light",
                            })}
                            onClick={() => chooseTheme("light")}
                        >
                            Светлая
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
