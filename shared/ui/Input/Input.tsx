"use client";

import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import cn from "classnames";

import styles from "./index.module.scss";

type Props = {
    value?: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
    title?: string;
    icon?: React.ReactNode;
    placeholder?: string;
    type?: "text" | "password" | "number";
    error?: boolean;
    errorMessage?: string;
    full?: boolean;
    disabled?: boolean;
    className?: string;
    wrapperClass?: string;
    component?: "input" | "textarea";
    fieldRequired?: boolean;
    onInputChange?: (value: string) => void;
} & (
    | InputHTMLAttributes<HTMLInputElement>
    | InputHTMLAttributes<HTMLTextAreaElement>
);

const Input: React.FC<Props> = ({
    value,
    setValue,
    title,
    icon,
    placeholder,
    type = "text",
    error = false,
    errorMessage,
    full = false,
    disabled = false,
    component = "input",
    className,
    wrapperClass,
    fieldRequired = false,
    onInputChange,
    ...props
}) => {
    return (
        <div
            className={cn(styles.inputInner, wrapperClass, {
                [styles.full]: full,
            })}
        >
            {title && (
                <p className={styles.inputTitle}>
                    {title}
                    {fieldRequired && <span>*</span>}
                </p>
            )}

            <div
                className={cn(styles.inputWrapper, className, {
                    [styles.disabled]: disabled,
                })}
            >
                {icon && icon}

                {component === "input" ? (
                    <input
                        type={type}
                        className={cn(styles.input, {
                            [styles.withIcon]: !!icon,
                        })}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => {
                            if (disabled) return;
                            const value = e.target.value;

                            if (onInputChange) {
                                onInputChange(value);
                            }

                            if (setValue) {
                                setValue(value);
                            }
                        }}
                        {...(props as TextareaHTMLAttributes<HTMLInputElement>)}
                    />
                ) : (
                    <textarea
                        className={cn(styles.input, styles.textarea, {
                            [styles.withIcon]: !!icon,
                        })}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => {
                            if (disabled) return;
                            onInputChange
                                ? onInputChange(e.target.value)
                                : setValue && setValue(e.target.value);
                        }}
                        {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    />
                )}
            </div>

            {error && errorMessage && (
                <p className={styles.inputMessage}>{errorMessage}</p>
            )}
        </div>
    );
};

export default Input;
