"use client";

import React, { HTMLAttributes } from "react";
import cn from "classnames";

import styles from "./index.module.scss";

import { CloseCircle } from "@/shared/icons";

type Props = {
    text?: string;
    icon?: React.ReactNode;
    danger?: boolean;
    small?: boolean;
    children?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const NotContent: React.FC<Props> = ({
    text,
    icon,
    danger = false,
    small = true,
    children,
    ...props
}) => {
    return (
        <div
            className={cn(styles.emptyContent, {
                [styles.danger]: danger,
            })}
            {...props}
        >
            <div
                className={cn(styles.emptyImgInner, {
                    [styles.small]: small,
                })}
            >
                {icon ? icon : <CloseCircle />}
            </div>

            {text && <p className={styles.emptyContentText}>{text}</p>}

            {children}
        </div>
    );
};

export default NotContent;
