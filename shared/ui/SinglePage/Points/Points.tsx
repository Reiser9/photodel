import React from "react";

import styles from "./index.module.scss";

const Points: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className={styles.points}>{children}</div>;
};

export default Points;
