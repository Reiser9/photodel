"use client";

import React from "react";
import { TimePicker as TimePickerAnt, TimePickerProps } from "antd";
import { Dayjs } from "dayjs";
import cn from "classnames";

import styles from "./index.module.scss";

import { Clock } from "@/shared/icons";

type Props = {
    placeholder?: string;
    title?: string;
    format?: string;
    value: Dayjs | null;
    setValue: (value: Dayjs | null) => void;
    wrapperClass?: string;
    className?: string;
} & TimePickerProps;

const TimePicker: React.FC<Props> = ({
    placeholder,
    format = "HH:mm",
    title,
    value,
    setValue,
    wrapperClass,
    className,
    ...props
}) => {
    return (
        <div className={cn(styles.timepickerInner, wrapperClass)}>
            {title && <p className={styles.timepickerTitle}>{title}</p>}

            <TimePickerAnt
                placeholder={placeholder}
                format={format}
                value={value}
                onChange={(e) => setValue(e ?? null)}
                suffixIcon={
                    <Clock style={{ width: 18, color: "var(--main)" }} />
                }
                className={cn(styles.timepicker, className)}
                {...props}
            />
        </div>
    );
};

export default TimePicker;
