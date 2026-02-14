import React from "react";
import cn from "classnames";

import styles from "./index.module.scss";

type Props = {
    disabled?: boolean;
    classNames?: string;
    children: React.ReactNode;
};

const Button: React.FC<Props> = ({ disabled, classNames, children }) => {
    return (
        <button
            className={cn(styles.button, classNames, {
                [styles.disabled]: disabled,
            })}
        >
            {children}
        </button>
    );
};

export default Button;
