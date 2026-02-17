"use client";

import React from "react";
import ReactDOM from "react-dom";
import cn from "classnames";

import styles from "./index.module.scss";

import { Close } from "@/shared/icons";

type Props = {
    value: boolean;
    setValue: (value: boolean) => void;
    title?: string;
    size?: "default" | "small";
    onClose?: () => void;
    children: React.ReactNode;
};

const Modal: React.FC<Props> = ({
    value,
    setValue,
    title,
    size = "default",
    onClose = () => {},
    children,
}) => {
    const closeModal = () => {
        setValue(false);
        onClose();
    };

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeModal();
            }
        };

        if (value) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [value]);

    if (!value) {
        return;
    }

    return ReactDOM.createPortal(
        <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={cn(styles.modalWrapper, styles[size])}>
                <div
                    className={styles.modalContent}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.modalTitleInner}>
                        {title && <p className={styles.modalTitle}>{title}</p>}

                        <button
                            className={styles.modalCrossButton}
                            onClick={closeModal}
                        >
                            <Close />
                        </button>
                    </div>

                    {children && (
                        <div className={styles.modalText}>{children}</div>
                    )}
                </div>
            </div>
        </div>,
        document.body,
    );
};

export default Modal;
