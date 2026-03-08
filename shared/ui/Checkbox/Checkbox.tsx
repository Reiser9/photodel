"use client";

import React, { SetStateAction } from "react";
import cn from "classnames";

import styles from "./index.module.scss";

type Props = {
    id: string;
    label?: string;
    value?: boolean;
    auto?: boolean;
    setValue?: React.Dispatch<SetStateAction<boolean>>;
    onChangeHandler?: () => void;
    wrapperClass?: string;
};

const Checkbox: React.FC<Props> = ({
    id,
    label,
    value,
    auto = false,
    setValue,
    onChangeHandler,
    wrapperClass,
}) => {
    return (
        <div
            className={cn(styles.checkboxInner, wrapperClass, {
                [styles.auto]: auto,
            })}
        >
            <input
                type="checkbox"
                className={styles.checkbox}
                id={id}
                checked={value}
                onChange={
                    onChangeHandler
                        ? onChangeHandler
                        : (e) => setValue && setValue(e.target.checked)
                }
            />

            <label htmlFor={id} className={styles.checkboxLabel}>
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
