import React from "react";

import styles from "./index.module.scss";

type Props = {
    title: string;
    text?: string;
    children?: React.ReactNode;
};

const TextPoint: React.FC<Props> = ({ title, text, children }) => {
    return (
        <div className={styles.textPoint}>
            <p className={styles.textPointTitle}>{title}</p>

            {text && <p className={styles.textPointText}>{text}</p>}
            {children && children}
        </div>
    );
};

export default TextPoint;
