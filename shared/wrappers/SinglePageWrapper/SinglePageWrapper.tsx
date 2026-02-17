import React from "react";
import cn from "classnames";

import styles from "./index.module.scss";

type Props = {
    content: React.ReactNode;
    sidebar: React.ReactNode;
    infoBlock: React.ReactNode;
};

const SinglePageWrapper: React.FC<Props> = ({
    content,
    sidebar,
    infoBlock,
}) => {
    return (
        <div className={styles.sinlePageContent}>
            <div className={styles.sinlePageInfo}>
                <div className={styles.signelPageInfoWrapper}>{infoBlock}</div>

                {content}
            </div>

            <div className={styles.sinlePageSidebar}>
                <div
                    className={cn(styles.signelPageInfoWrapper, styles.mobile)}
                >
                    {infoBlock}
                </div>

                {sidebar}
            </div>
        </div>
    );
};

export default SinglePageWrapper;
