'use client';

import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import cn from 'classnames';

import styles from './index.module.scss';

type Props = {
    danger?: boolean;
    disabled?: boolean;
    className?: string;
    href?: string;
    children?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement> &
    AnchorHTMLAttributes<HTMLAnchorElement>;

const MenuLink: React.FC<Props> = ({ danger = false, disabled = false, className, href, children, ...props }) => {
    const content = () => {
        const defaultClasses = cn(styles.hoverMenuLink, className, {
            [styles.delete]: danger,
            [styles.disabled]: disabled,
        });

        if (disabled) {
            return <button className={defaultClasses}>{children}</button>;
        }

        if (href) {
            return (
                <Link className={defaultClasses} href={href}>
                    {children}
                </Link>
            );
        }

        return (
            <button className={defaultClasses} {...props}>
                {children}
            </button>
        );
    };

    return <>{content()}</>;
};

export default MenuLink;
