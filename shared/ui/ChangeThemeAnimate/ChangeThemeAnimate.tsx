'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

import { Moon, Sun } from '@/shared/icons';
import { useThemeContext } from '@/shared/context/ThemeProvider';

const ChangeThemeAnimate = () => {
    const [isAnimate, setIsAnimate] = React.useState(false);
    const [isAnimateIcons, setIsAnimateIcons] = React.useState(false);

    const { theme, readyAnimation } = useThemeContext();

    const startAnimation = () => {
        setIsAnimate(true);

        setTimeout(() => setIsAnimateIcons(true), 800);
        setTimeout(() => setIsAnimateIcons(false), 1900);
        setTimeout(() => setIsAnimate(false), 2700);
    };

    React.useEffect(() => {
        if (readyAnimation) {
            startAnimation();
        }
    }, [theme, readyAnimation]);

    return (
        <div
            className={cn(styles.themeAnimate, {
                [styles.active]: isAnimate,
                [styles.light]: theme === 'light',
                [styles.dark]: theme === 'dark',
            })}
        >
            <div className={styles.themeAnimateItem}></div>
            <div className={styles.themeAnimateItem}></div>
            <div className={styles.themeAnimateItem}></div>
            <div className={styles.themeAnimateItem}></div>

            <div
                className={cn(styles.themeAnimateIcons, {
                    [styles.activeIcons]: isAnimateIcons,
                })}
            >
                <Sun className={cn(styles.themeAnimateIcon, styles.iconSun)} />
                <Moon className={cn(styles.themeAnimateIcon, styles.iconMoon)} />
            </div>
        </div>
    );
};

export default ChangeThemeAnimate;
