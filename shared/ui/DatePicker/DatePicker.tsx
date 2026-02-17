'use client';

import React from 'react';
import moment from 'moment-timezone';
import cn from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker as DatePickerAnt } from 'antd';
import { DatePickerProps } from 'antd/lib';

import styles from './index.module.scss';

import { Date } from '@/shared/icons';

type Props = {
    format?: string;
    placeholder?: string;
    title?: string;
    disablePrevDate?: boolean;
    wrapperClass?: string;
    className?: string;
    value: Dayjs | Dayjs[] | null;
    setValue: React.Dispatch<React.SetStateAction<Dayjs | Dayjs[] | null>>
} & DatePickerProps;

const DatePicker: React.FC<Props> = ({
    format = 'DD.MM.YYYY',
    placeholder = '',
    title,
    value,
    setValue,
    disablePrevDate = false,
    wrapperClass,
    className,
    ...props
}) => {
    const disabledDate = (current: Dayjs) => {
        return current < moment().startOf('day');
    };

    return (
        <div className={cn(styles.datepickerInner, wrapperClass)}>
            {title && <p className={styles.datepickerTitle}>{title}</p>}

            <DatePickerAnt
                format={format}
                placeholder={placeholder}
                disabledDate={disablePrevDate ? disabledDate : undefined}
                suffixIcon={<Date width="18" style={{ color: 'var(--main)' }} />}
                allowClear={false}
                className={cn(styles.datepicker, className)}
                value={value}
                onChange={setValue}
                {...props}
            />
        </div>
    );
};

export default DatePicker;
