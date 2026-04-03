"use client";

import React from "react";
import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import styles from "./index.module.scss";
import base from "@/shared/styles/base.module.scss";

import {
    ArrowDown,
    Camera,
    Close,
    Menu,
    Moon,
    Notify,
    Pin,
    Profile,
    Sun,
} from "@/shared/icons";
import { useThemeContext } from "@/shared/context/ThemeProvider";
import { Login, Register, Recovery, VerifyModal } from "../Auth";
import { useAppSelector } from "@/shared/hooks/useRedux";
import { useAuth, useUserInfo } from "@/features/user";
import { HoverMenu, MenuLink } from "@/shared/ui/HoverMenu";
import { Pro } from "@/shared/ui/Pro";
import { ConfirmModal } from "@/shared/ui/Modal";
import { useAuthContext } from "@/shared/context/AuthProvider";

type Props = {
    light?: boolean;
};

const Header: React.FC<Props> = ({ light = false }) => {
    const [confirmLogoutModal, setConfirmLogoutModal] = React.useState(false);

    const [menuIsOpen, setMenuIsOpen] = React.useState(false);
    const [profileMenu, setProfileMenu] = React.useState(false);
    const [profileAuthMenu, setProfileAuthMenu] = React.useState(false);

    const { loginModal, setLoginModal, registerModal, setRegisterModal } =
        useAuthContext();

    const [recoveryModal, setRecoveryModal] = React.useState(false);

    const { theme, toggleTheme, chooseTheme } = useThemeContext();
    const { logout } = useAuth();
    const { getShortInfo } = useUserInfo();
    const pathname = usePathname();

    const { isAuth, isVerified } = useAppSelector((state) => state.user);

    const profileMenuRef = React.useRef<HTMLDivElement>(null);
    const profileAuthMenuRef = React.useRef<HTMLDivElement>(null);

    const { data } = useQuery({
        queryKey: ["shortInfo"],
        queryFn: () => getShortInfo(),
        gcTime: 0,
        refetchOnMount: true,
    });

    const { avatarUrl, firstName, lastName } = data || {};

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

                            {isAuth ? (
                                <div className={styles.profileWrapper}>
                                    <div className={styles.profileNotifyInner}>
                                        <button
                                            className={styles.profileNotify}
                                        >
                                            <Notify />
                                        </button>

                                        {/* <p className={styles.profileCounter}>
                                            2
                                        </p> */}
                                    </div>

                                    <div
                                        className={styles.profileContent}
                                        ref={profileAuthMenuRef}
                                        onClick={() =>
                                            setProfileAuthMenu((prev) => !prev)
                                        }
                                    >
                                        <HoverMenu
                                            button={
                                                <div
                                                    className={
                                                        styles.profileAvatar
                                                    }
                                                >
                                                    {avatarUrl && (
                                                        <Image
                                                            src={avatarUrl}
                                                            alt={`Аватар пользователя ${firstName} ${lastName}`}
                                                            fill
                                                        />
                                                    )}
                                                </div>
                                            }
                                            value={profileAuthMenu}
                                            setValue={setProfileAuthMenu}
                                            overlayClass={styles.profileOverlay}
                                            contentClass={
                                                styles.profileMenuContent
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.profileMenuUser
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.profileMenuUserImg
                                                    }
                                                >
                                                    {avatarUrl && (
                                                        <Image
                                                            src={avatarUrl}
                                                            alt={`Аватар пользователя ${firstName} ${lastName}`}
                                                            fill
                                                        />
                                                    )}
                                                </div>

                                                <div
                                                    className={
                                                        styles.profileMenuUserWrapper
                                                    }
                                                >
                                                    <p
                                                        className={
                                                            styles.profileMenuUserName
                                                        }
                                                    >
                                                        {lastName} {firstName}
                                                    </p>

                                                    <Pro />
                                                </div>
                                            </div>

                                            <div
                                                className={
                                                    styles.profileMenuNav
                                                }
                                            >
                                                <Link
                                                    href="/profile"
                                                    className={
                                                        styles.profileMenuNavLink
                                                    }
                                                    onClick={() =>
                                                        setProfileAuthMenu(
                                                            false,
                                                        )
                                                    }
                                                >
                                                    Мой профиль
                                                </Link>

                                                <Link
                                                    href="/profile"
                                                    className={cn(
                                                        styles.profileMenuNavLink,
                                                        styles.active,
                                                    )}
                                                >
                                                    1 новый запрос на съемку
                                                </Link>

                                                <Link
                                                    href="/profile"
                                                    className={cn(
                                                        styles.profileMenuNavLink,
                                                        styles.active,
                                                    )}
                                                >
                                                    1 новый запрос на обучение
                                                </Link>

                                                <Link
                                                    href="/profile"
                                                    className={cn(
                                                        styles.profileMenuNavLink,
                                                        styles.active,
                                                    )}
                                                >
                                                    1 новый запрос в команду
                                                </Link>

                                                <Link
                                                    href="/profile"
                                                    className={cn(
                                                        styles.profileMenuNavLink,
                                                        styles.active,
                                                    )}
                                                >
                                                    1 новый запрос на покупку
                                                </Link>

                                                <Link
                                                    href="/profile"
                                                    className={
                                                        styles.profileMenuNavLink
                                                    }
                                                >
                                                    3 новых сообщения
                                                </Link>

                                                <button
                                                    className={
                                                        styles.profileMenuNavLink
                                                    }
                                                    onClick={() => {
                                                        setProfileAuthMenu(
                                                            false,
                                                        );
                                                        setConfirmLogoutModal(
                                                            true,
                                                        );
                                                    }}
                                                >
                                                    Выйти
                                                </button>
                                            </div>
                                        </HoverMenu>

                                        {/* <p className={styles.profileCounter}>
                                            3
                                        </p> */}
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={styles.headerProfile}
                                    ref={profileMenuRef}
                                    onClick={() =>
                                        setProfileMenu((prev) => !prev)
                                    }
                                >
                                    <HoverMenu
                                        button={<Profile />}
                                        value={profileMenu}
                                        setValue={setProfileMenu}
                                    >
                                        <MenuLink
                                            onClick={() => {
                                                setLoginModal(true);
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
                            )}
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

            {!isAuth && (
                <>
                    <Login
                        value={loginModal}
                        setValue={setLoginModal}
                        recoveryCallback={() => {
                            setLoginModal(false);
                            setRecoveryModal(true);
                        }}
                        registerCallback={() => {
                            setLoginModal(false);
                            setRegisterModal(true);
                        }}
                    />

                    <Register
                        value={registerModal}
                        setValue={setRegisterModal}
                        loginCallback={() => {
                            setRegisterModal(false);
                            setLoginModal(true);
                        }}
                    />

                    <Recovery
                        value={recoveryModal}
                        setValue={setRecoveryModal}
                        loginCallback={() => {
                            setRecoveryModal(false);
                            setLoginModal(true);
                        }}
                        registerCallback={() => {
                            setRecoveryModal(false);
                            setRegisterModal(true);
                        }}
                    />
                </>
            )}

            {isAuth && !isVerified && (
                <VerifyModal value={true} setValue={() => {}} />
            )}

            <ConfirmModal
                title="Вы точно хотите выйти из аккаунта?"
                value={confirmLogoutModal}
                setValue={setConfirmLogoutModal}
                callback={() => logout()}
            />
        </>
    );
};

export default Header;
