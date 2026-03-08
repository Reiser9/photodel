import React from "react";

import styles from "./index.module.scss";

type Props = {
    title: string;
    children: React.ReactNode;
};

const Chapter: React.FC<Props> = ({ title, children }) => {
    return (
        <div className={styles.chapter}>
            <p className={styles.chapterTitle}>{title}</p>

            {children}
        </div>
    );
};

export default Chapter;
