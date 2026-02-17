"use client";

import React from "react";
import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
import { HoverMenu, MenuLink } from "@/shared/ui/HoverMenu";
import { Modal } from "@/shared/ui/Modal";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { Checkbox } from "@/shared/ui/Checkbox";

type Props = {
    light?: boolean;
};

const Header: React.FC<Props> = ({ light = false }) => {
    const [menuIsOpen, setMenuIsOpen] = React.useState(false);
    const [profileMenu, setProfileMenu] = React.useState(false);

    const [authModal, setAuthModal] = React.useState(false);
    const [registerModal, setRegisterModal] = React.useState(false);
    const [recoveryModal, setRecoveryModal] = React.useState(false);

    const { theme, toggleTheme, chooseTheme } = useThemeContext();
    const pathname = usePathname();

    const profileMenuRef = React.useRef<HTMLDivElement>(null);

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

                            <div
                                className={styles.headerProfile}
                                ref={profileMenuRef}
                                onClick={() => setProfileMenu((prev) => !prev)}
                            >
                                <HoverMenu
                                    button={<Profile />}
                                    value={profileMenu}
                                    setValue={setProfileMenu}
                                >
                                    <MenuLink
                                        onClick={() => {
                                            setAuthModal(true);
                                            setProfileMenu(false);
                                        }}
                                    >
                                        Войти
                                    </MenuLink>
                                    <MenuLink
                                        onClick={() => {
                                            setRegisterModal(true);
                                            setProfileMenu(false);
                                        }}
                                    >
                                        Зарегистрироваться
                                    </MenuLink>
                                </HoverMenu>
                            </div>
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
                                <Link
                                    href="/profies"
                                    className={cn(styles.headerNavLink, {
                                        [styles.active]:
                                            pathname === "/profies",
                                    })}
                                >
                                    Профи рядом
                                </Link>

                                <Link
                                    href="/places"
                                    className={cn(styles.headerNavLink, {
                                        [styles.active]: pathname === "/places",
                                    })}
                                >
                                    Места для съемок
                                </Link>

                                <Link
                                    href="/photos"
                                    className={cn(styles.headerNavLink, {
                                        [styles.active]: pathname === "/photos",
                                    })}
                                >
                                    Фотографии
                                </Link>

                                <Link
                                    href="/trainings"
                                    className={cn(styles.headerNavLink, {
                                        [styles.active]:
                                            pathname === "/trainings",
                                    })}
                                >
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
                        <Link
                            href="/profies"
                            className={styles.headerNavLink}
                            onClick={() => setMenuIsOpen(false)}
                        >
                            Профи рядом
                        </Link>

                        <Link
                            href="/places"
                            className={styles.headerNavLink}
                            onClick={() => setMenuIsOpen(false)}
                        >
                            Места для съемок
                        </Link>

                        <Link
                            href="/photos"
                            className={styles.headerNavLink}
                            onClick={() => setMenuIsOpen(false)}
                        >
                            Фотографии
                        </Link>

                        <Link
                            href="/trainings"
                            className={styles.headerNavLink}
                            onClick={() => setMenuIsOpen(false)}
                        >
                            Обучение
                        </Link>
                    </nav>

                    <button className={styles.headerLocation}>
                        <Pin />

                        <span className={styles.headerCity}>Москва</span>

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
                                        [styles.dark]: theme === "dark",
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

            <Modal
                value={authModal}
                setValue={setAuthModal}
                title="Вход"
                size="small"
            >
                <div className={styles.authForm}>
                    <Input title="E-mail" full />
                    <Input title="Пароль" full type="password" />

                    <Checkbox id="auth_remember" label="Запомнить меня" />

                    <Button>Войти</Button>

                    <div className={styles.authLinks}>
                        <button
                            className={styles.authLink}
                            onClick={() => {
                                setAuthModal(false);
                                setRecoveryModal(true);
                            }}
                        >
                            Напомнить пароль
                        </button>
                        <button
                            className={styles.authLink}
                            onClick={() => {
                                setAuthModal(false);
                                setRegisterModal(true);
                            }}
                        >
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal
                value={registerModal}
                setValue={setRegisterModal}
                title="Регистрация"
                size="small"
            >
                <div className={styles.authForm}>
                    <Input title="Имя" full />
                    <Input title="Фамилия" full />
                    <Input title="E-mail" full />
                    <Input title="Пароль" full type="password" />
                    <Input title="Повторите пароль" full type="password" />

                    <Checkbox id="is_adult" label="Мне есть 18 лет" />
                    <Checkbox
                        id="register_profi"
                        label="Я регистрируюсь как Профи"
                    />

                    <Button>Зарегистрироваться</Button>

                    <div className={styles.authLinks}>
                        <button
                            className={styles.authLink}
                            onClick={() => {
                                setRegisterModal(false);
                                setAuthModal(true);
                            }}
                        >
                            У меня уже есть аккаунт
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal
                value={recoveryModal}
                setValue={setRecoveryModal}
                title="Напомнить пароль"
                size="small"
            >
                <div className={styles.authForm}>
                    <Input title="E-mail" full />

                    <Button>Отправить</Button>

                    <div className={styles.authLinks}>
                        <button
                            className={styles.authLink}
                            onClick={() => {
                                setRecoveryModal(false);
                                setAuthModal(true);
                            }}
                        >
                            Я вспомнил пароль
                        </button>
                        <button
                            className={styles.authLink}
                            onClick={() => {
                                setRecoveryModal(false);
                                setRegisterModal(true);
                            }}
                        >
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Header;
