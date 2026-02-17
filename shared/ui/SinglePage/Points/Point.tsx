import React from "react";
import cn from "classnames";

import styles from "./index.module.scss";

type Props = {
    children: React.ReactNode;
    full?: boolean;
};

const Point: React.FC<Props> = ({ children, full = false }) => {
    return (
        <p
            className={cn(styles.point, {
                [styles.full]: full,
            })}
        >
            {children}
        </p>
    );
};

export default Point;
