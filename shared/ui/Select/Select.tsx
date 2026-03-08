"use client";

import cn from "classnames";
import { Select as SelectAnt } from "antd";
import { SelectProps } from "antd/lib";

import styles from "./index.module.scss";

import { ArrowBottom, Close } from "@/shared/icons";
import { Preloader } from "../Preloader";
import { NotContent } from "../NotContent";

type Option = {
    label: string;
    value: string | number;
};

type Props<T> = {
    placeholder?: string;
    value?: T | null;
    setValue?: (value: T) => void;
    options?: Option[];
    loading?: boolean;
    error?: boolean;
    errorMessage?: string;
    showSearch?: boolean;
    clear?: boolean;
    notContentText?: string;
    errorText?: string;
    title?: string;
    wrapperClass?: string;
    className?: string;
    full?: boolean;
    fieldRequired?: boolean;
} & SelectProps<T>;

const Select = <T,>({
    placeholder,
    value,
    setValue,
    options,
    notContentText = "Ничего не найдено",
    errorText = "Произошла ошибка при загрузке данных",
    title,
    loading = false,
    error = false,
    errorMessage,
    clear = false,
    wrapperClass,
    className,
    full,
    fieldRequired = false,
    ...props
}: Props<T>) => {
    return (
        <div
            className={cn(styles.selectInner, wrapperClass, {
                [styles.full]: full,
            })}
        >
            {title && (
                <p className={styles.selectTitle}>
                    {title}
                    {fieldRequired && <span>*</span>}
                </p>
            )}

            <div className={styles.selectWrapper}>
                <SelectAnt
                    placeholder={placeholder}
                    value={value}
                    onChange={setValue}
                    allowClear={
                        clear
                            ? {
                                  clearIcon: (
                                      <Close
                                          width="12"
                                          style={{ color: "var(--black)" }}
                                      />
                                  ),
                              }
                            : false
                    }
                    className={cn(styles.select, className)}
                    suffixIcon={
                        <ArrowBottom
                            width="12"
                            style={{ color: "var(--black)" }}
                        />
                    }
                    notFoundContent={
                        loading ? (
                            <Preloader small wrapperClassName={styles.loader} />
                        ) : error ? (
                            <NotContent
                                text={errorText}
                                danger
                                icon={<Close />}
                                small
                            />
                        ) : (
                            <NotContent text={notContentText} small />
                        )
                    }
                    removeIcon={
                        <Close width="12" style={{ color: "var(--black)" }} />
                    }
                    options={options}
                    {...props}
                />
            </div>

            {error && errorMessage && (
                <p className={styles.selectMessage}>{errorMessage}</p>
            )}
        </div>
    );
};

export default Select;
