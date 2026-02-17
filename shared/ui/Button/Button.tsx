"use client";

import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import cn from "classnames";

import styles from "./index.module.scss";

import { Preloader } from "../Preloader";

type Props = {
    auto?: boolean;
    loading?: boolean;
    disabled?: boolean;
    small?: boolean;
    levitation?: boolean;
    href?: string;
    color?: "primary" | "danger";
    variant?: "fill" | "outline";
    wrapperStyle?: React.CSSProperties;
    wrapperClass?: string;
    children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement> &
    AnchorHTMLAttributes<HTMLAnchorElement>;

const Button: React.FC<Props> = ({
    auto = false,
    loading = false,
    disabled = false,
    small = false,
    levitation = false,
    href,
    color = "primary",
    variant = "fill",
    wrapperStyle,
    wrapperClass,
    className,
    children,
    ...props
}) => {
    const content = (): React.ReactNode => {
        const defaultClasses = cn(
            styles.button,
            styles[color],
            styles[variant],
            className,
            {
                [styles.disabled]: disabled || loading,
                [styles.small]: small,
            },
        );

        if (disabled) {
            return (
                <button className={defaultClasses}>
                    {!loading && children}
                </button>
            );
        }

        if (href) {
            return (
                <Link
                    prefetch={false}
                    href={href}
                    className={defaultClasses}
                    {...props}
                >
                    {!loading && children}
                </Link>
            );
        }

        return (
            <button className={defaultClasses} {...props}>
                {!loading && children}
            </button>
        );
    };

    return (
        <div
            className={cn(styles.buttonInner, wrapperClass, {
                [styles.auto]: auto,
                [styles.levitation]: levitation,
            })}
            style={wrapperStyle}
        >
            {content()}

            {loading && (
                <span className={styles.buttonPreloader}>
                    <Preloader small theme={color} />
                </span>
            )}
        </div>
    );
};

export default Button;
