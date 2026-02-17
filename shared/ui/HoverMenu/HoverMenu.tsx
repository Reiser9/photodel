'use client';

import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

import styles from './index.module.scss';

type Props = {
    value: boolean;
    setValue: (value: boolean) => void;
    button: React.ReactNode;
    big?: boolean;
    placement?: 'left' | 'center' | 'right';
    children?: React.ReactNode;
};

const HoverMenu: React.FC<Props> = ({
    value,
    setValue,
    button,
    big = false,
    placement = 'left',
    children,
    ...props
}) => {
    const [isMobile, setIsMobile] = React.useState(false);
    const [isCanHover, setIsCanHover] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);

    const closeMenu = () => {
        setValue(false);
    };

    React.useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                closeMenu();
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    React.useEffect(() => {
        const isMobileScreen = window.matchMedia('(max-width: 768px) and (hover: none) and (pointer: coarse)').matches;
        setIsMobile(isMobileScreen);
    }, []);

    React.useEffect(() => {
        const isHoverScreen = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        setIsCanHover(isHoverScreen);
    }, []);

    const hoverMenuContent = (
        <div
            className={cn(styles.hoverMenuOverlay, styles[placement], {
                [styles.big]: big,
            })}
            onClick={closeMenu}
        >
            <div className={styles.hoverMenu}>
                <div className={styles.hoverMenuContent} onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    );

    return (
        <div className={styles.hoverMenuWrapper} ref={menuRef} {...props}>
            {button}

            {(value || isCanHover) &&
                (isMobile ? ReactDOM.createPortal(hoverMenuContent, document.body) : hoverMenuContent)}
        </div>
    );
};

export default HoverMenu;
