import React from "react";

import styles from "./index.module.scss";

type Props = {
    title: string;
    children: React.ReactNode;
}

const Peoples: React.FC<Props> = ({
    title,
    children
}) => {
    return <div className={styles.peopleContent}>
        <p className={styles.peopleTitle}>{title}</p>

        <div className={styles.peopleItems}>{children}</div>
    </div>;
};

export default Peoples;
